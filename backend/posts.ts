import { ObjectId } from 'mongodb';
import sanitizeHtml from 'sanitize-html';

class HttpError extends Error {
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
        throw new HttpError('Failed to fetch posts', 500);
    }
}

