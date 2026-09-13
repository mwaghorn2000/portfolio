import { Db, ObjectId } from 'mongodb';
import { connectToDatabase } from '@/app/lib/mongodb';
import { renderMarkdown } from './markdown';

export class HttpError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = 'HttpError';
    }
}

export const getPosts = async (db: Db) => {
    try {
        return await db.collection('posts').find({}).toArray();
    } catch {
        throw new HttpError('Failed to fetch posts', 500);
    }
};

export const getPostMarkdown = async (db: Db, postId: string) => {
    if (!ObjectId.isValid(postId)) return null;

    try {
        return await db.collection('posts').findOne({ _id: new ObjectId(postId) });
    } catch {
        throw new HttpError('Failed to fetch post', 500);
    }
};

export const getPost = async (db: Db, postId: string) => {
    const post = await getPostMarkdown(db, postId);
    if (!post) return null;

    return { ...post, content: renderMarkdown(post.content) };
};

export const validateTitle = (title: unknown) => {
    if (typeof title !== 'string' || title.trim() === '') {
        return { error: 'invalid title: required' };
    }
    if (title.length > 120) return { error: 'invalid title: too long' };
    return { title };
};

export const validateAuthor = (author: unknown) => {
    if (author !== 'Mitchell Waghorn') return { error: 'invalid author' };
    return { author };
};

export const validateContent = (content: unknown) => {
    if (typeof content !== 'string' || content.trim() === '') {
        return { error: 'invalid content: required' };
    }
    if (content.length > 200000) return { error: 'invalid content: too long' };
    return { content };
};

export const submitData = async (data: { title: string; author: string; content: string }) => {
    try {
        const { db } = await connectToDatabase();
        return await db.collection('posts').insertOne({
            title: data.title,
            author: data.author,
            content: data.content,
            likes: 0,
            datePublished: new Date(),
        });
    } catch {
        throw new HttpError('Failed to create post', 500);
    }
};

export const updatePost = async (_id: string, title: string, author: string, content: string) => {
    if (!ObjectId.isValid(_id)) throw new HttpError('Post not found', 404);
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('posts').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { title, author, content } },
        );
        if (result.matchedCount === 0) throw new HttpError('Post not found', 404);
        return result;
    } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError('Failed to update post', 500);
    }
};

export const deletePost = async (_id: string) => {
    if (!ObjectId.isValid(_id)) throw new HttpError('Post not found', 404);
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('posts').deleteOne({ _id: new ObjectId(_id) });
        if (result.deletedCount === 0) throw new HttpError('Post not found', 404);
        return result;
    } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError('Failed to delete post', 500);
    }
};