import { Db } from 'mongodb';
import { connectToDatabase } from '@/app/lib/mongodb';
import { getPosts, getPost, getPostMarkdown, submitData, updatePost, deletePost, validateTitle, validateContent } from '@/backend/posts';

jest.mock('@/app/lib/mongodb', () => ({ connectToDatabase: jest.fn() }));

const id = '507f1f77bcf86cd799439011';
const collection = {
    find: jest.fn(), findOne: jest.fn(), insertOne: jest.fn(),
    updateOne: jest.fn(), deleteOne: jest.fn(),
};
const db = { collection: jest.fn(() => collection) } as unknown as Db;

beforeEach(() => {
    jest.resetAllMocks();
    (db.collection as jest.Mock).mockReturnValue(collection);
    (connectToDatabase as jest.Mock).mockResolvedValue({ db });
});

test('lists posts and reports database failures', async () => {
    const posts = [{ title: 'Test' }];
    collection.find.mockReturnValue({ toArray: jest.fn().mockResolvedValue(posts) });
    await expect(getPosts(db)).resolves.toEqual(posts);
    expect(collection.find).toHaveBeenCalledWith({});
    collection.find.mockImplementation(() => { throw new Error('offline'); });
    await expect(getPosts(db)).rejects.toMatchObject({ statusCode: 500 });
});

test('missing or malformed post IDs return null', async () => {
    await expect(getPost(db, 'invalid')).resolves.toBeNull();
    expect(collection.findOne).not.toHaveBeenCalled();
    collection.findOne.mockResolvedValue(null);
    await expect(getPost(db, id)).resolves.toBeNull();
    await expect(getPostMarkdown(db, id)).resolves.toBeNull();
});

test('renders safe markdown without mutating the database document', async () => {
    const post = { content: '# Heading\n<script>alert(1)</script>\n![alt](https://example.com/photo.png)' };
    collection.findOne.mockResolvedValue(post);
    const result = await getPost(db, id);
    expect(result?.content).toContain('<h3');
    expect(result?.content).toContain('<img');
    expect(result?.content).not.toContain('<script');
    expect(post.content).toContain('# Heading');
});

test.each([undefined, null, 1, {}, [], '', '   '])('rejects non-text or empty fields: %p', value => {
    expect(validateTitle(value).error).toBeDefined();
    expect(validateContent(value).error).toBeDefined();
});

test('enforces the existing title length limit', () => {
    expect(validateTitle('a'.repeat(25)).error).toBeUndefined();
    expect(validateTitle('a'.repeat(26)).error).toBeDefined();
});

test('propagates failed inserts', async () => {
    collection.insertOne.mockRejectedValue(new Error('offline'));
    await expect(submitData({ title: 'Title', author: 'Mitchell Waghorn', content: 'Text' }))
        .rejects.toMatchObject({ statusCode: 500 });
});

test('reports missing update and delete targets', async () => {
    collection.updateOne.mockResolvedValue({ matchedCount: 0 });
    collection.deleteOne.mockResolvedValue({ deletedCount: 0 });
    await expect(updatePost(id, 'Title', 'Mitchell Waghorn', 'Text')).rejects.toMatchObject({ statusCode: 404 });
    await expect(deletePost(id)).rejects.toMatchObject({ statusCode: 404 });
});

test('an unchanged existing post is still a successful update', async () => {
    collection.updateOne.mockResolvedValue({ matchedCount: 1, modifiedCount: 0 });
    await expect(updatePost(id, 'Title', 'Mitchell Waghorn', 'Text')).resolves.toMatchObject({ matchedCount: 1 });
});