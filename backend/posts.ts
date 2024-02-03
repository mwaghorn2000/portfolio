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
    
}

