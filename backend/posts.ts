import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/app/lib/mongodb';
import sanitizeHtml from 'sanitize-html';


export class HttpError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError";
    }
}

export const getPosts = async (db: any) => {
    try {
        const posts = await db.collection('posts').find({}).toArray();
        return posts;
    } catch (error: any) {
        throw new HttpError('Failed to fetch posts', 500);
    }
}

export const getPost = async (db: any, postId: string) => {
    try {
        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });

        //Showdown library which converts markdown into html
        let showdown = require('showdown'),
            converter = new showdown.Converter({ headerLevelStart: 3 }),
            text = post.content,
            html = converter.makeHtml(text);

        html = sanitizeHtml(html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                'img': ['src', 'alt']
            }
        });

        post.content = html;

        return post;
    } catch (error: any) {
        throw new HttpError('Failed to fetch post', 500);
    }
}

export const getPostMarkdown = async (db: any, postId: string) => {
    try {
        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
        return post;
    } catch (error: any) {
        throw new HttpError('Failed to fetch post', 500);
    }
}

export const validateTitle = (title: string) => {
    if (!title || title.trim() === '') {
        return { error: 'invalid title: too long' };
    }

    if (title.length > 25) {
        return { error: 'invalid title: too long'}
    }

    return { title: title };
}

export const validateAuthor = (author: string) => {
    if (!author || author !== 'Mitchell Waghorn') {
        return { error: 'invalid author'};
    }

    return { author: author };
}

export const validateContent = (content: string) => {
    if (!content || content.trim() === '') {
        return { error: 'invalid author' };
    }

    return { content: content };
}

export const submitData = async (data: { title: string, author: string, content: string }) => {
    const { client, db } = await connectToDatabase();

    const post = {
        title: data.title,
        author: data.author,
        content: data.content,
        likes: 0,
        datePublished: new Date()
    }

  try {
    const collection = db.collection('posts'); // Replace with your collection name
    const result = await collection.insertOne(post); // Insert a single document
    console.log(`New document inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

export const updatePost = async (_id: string, title: string, author: string, content: string) => {
    const { db } = await connectToDatabase();

    try {
        const collection = db.collection('posts');
        const result = await collection.updateOne(
            {_id: new ObjectId(_id) },
            {
                $set: {
                    title: title,
                    author: author,
                    content: content
                }
            }
        );
        console.log(`Document updated with the _id: ${_id}`);
    } catch (error: any) {
        throw new HttpError("Failed to update post!", 500);
    }
} 

export const deletePost = async (_id: string) => {
    const { db } = await connectToDatabase();

    try {
        const collection = db.collection('posts');
        await collection.deleteOne({ _id: new ObjectId(_id) });
        console.log(`Post ${_id} deleted`);
    } catch (error: any) {
        throw new HttpError(error, 500);
    }
}

