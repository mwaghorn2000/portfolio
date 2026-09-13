import { NextResponse } from 'next/server';
import { HttpError, validateAuthor, validateContent, validateTitle } from './posts';

export async function readPostData(request: Request) {
    let data: unknown;
    try {
        data = await request.json();
    } catch {
        throw new HttpError('Invalid JSON', 400);
    }
    if (!data || typeof data !== 'object') throw new HttpError('Invalid post', 400);
    const { title, author, content } = data as Record<string, unknown>;
    const validatedTitle = validateTitle(title);
    const validatedAuthor = validateAuthor(author);
    const validatedContent = validateContent(content);
    const error = validatedTitle.error ?? validatedAuthor.error ?? validatedContent.error;
    if (error) throw new HttpError(error, 400);
    return {
        title: validatedTitle.title!,
        author: validatedAuthor.author!,
        content: validatedContent.content!,
    };
}

export function postErrorResponse(error: unknown) {
    return NextResponse.json(
        { error: error instanceof HttpError ? error.message : 'Failed to process post' },
        { status: error instanceof HttpError ? error.statusCode : 500 },
    );
}