import { NextRequest } from 'next/server';
import { POST } from '@/app/api/posts/CreatePost/route';
import { PUT } from '@/app/api/posts/UpdatePost/[slug]/route';
import { submitData, updatePost, HttpError } from '@/backend/posts';

jest.mock('@/app/lib/mongodb', () => ({ connectToDatabase: jest.fn() }));
jest.mock('@/backend/posts', () => ({
    ...jest.requireActual('@/backend/posts'),
    submitData: jest.fn(),
    updatePost: jest.fn(),
}));

const data = { title: 'Title', author: 'Mitchell Waghorn', content: 'Text' };
const params = { params: { slug: '507f1f77bcf86cd799439011' } };
const request = (body: unknown, method = 'POST') => new NextRequest('http://localhost/api/posts', {
    method, body: JSON.stringify(body),
});

test.each([null, {}, { ...data, title: 123 }, { ...data, content: [] }])('rejects malformed post payloads', async body => {
    expect((await POST(request(body))).status).toBe(400);
    expect(submitData).not.toHaveBeenCalled();
});

test('rejects malformed JSON', async () => {
    const req = new NextRequest('http://localhost/api/posts', { method: 'POST', body: '{' });
    expect((await POST(req)).status).toBe(400);
});

test('creation waits for the insert to finish', async () => {
    let finish!: () => void;
    (submitData as jest.Mock).mockImplementation(() => new Promise<void>(resolve => { finish = resolve; }));
    let settled = false;
    const response = POST(request(data)).then(value => { settled = true; return value; });
    await new Promise(resolve => setImmediate(resolve));
    expect(submitData).toHaveBeenCalledWith(data);
    expect(settled).toBe(false);
    finish();
    expect((await response).status).toBe(200);
});

test('create and update return database failures', async () => {
    (submitData as jest.Mock).mockRejectedValue(new HttpError('Failed to create post', 500));
    (updatePost as jest.Mock).mockRejectedValue(new HttpError('Failed to update post', 500));
    expect((await POST(request(data))).status).toBe(500);
    expect((await PUT(request(data, 'PUT'), params)).status).toBe(500);
});

test('update returns JSON so fetch does not repeat PUT against the dashboard', async () => {
    (updatePost as jest.Mock).mockResolvedValue({ matchedCount: 1 });
    const response = await PUT(request(data, 'PUT'), params);
    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
});