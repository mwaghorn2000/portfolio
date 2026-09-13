import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });

function request(path: string, token?: string) {
    return new NextRequest(new URL(path, 'http://localhost'), {
        headers: token ? { cookie: `token=${token}` } : {},
    });
}

test('redirects dashboard visitors without a session', async () => {
    const response = await middleware(request('/Blog/Dashboard'));
    expect(response.headers.get('location')).toBe('http://localhost/Blog/Login');
});

test('rejects unauthenticated API requests', async () => {
    expect((await middleware(request('/api/posts/CreatePost'))).status).toBe(401);
});

test('fails closed when token verification is unavailable', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
    expect((await middleware(request('/api/posts/CreatePost', 'token'))).status).toBe(401);
    expect((await middleware(request('/Blog/Dashboard', 'token'))).headers.get('location'))
        .toBe('http://localhost/Blog/Login');
});

test('rejects invalid tokens and permits verified tokens', async () => {
    global.fetch = jest.fn().mockResolvedValue(new Response(null, { status: 401 }));
    expect((await middleware(request('/api/posts/CreatePost', 'invalid'))).status).toBe(401);
    global.fetch = jest.fn().mockResolvedValue(new Response(null, { status: 200 }));
    expect((await middleware(request('/api/posts/CreatePost', 'valid'))).headers.get('x-middleware-next')).toBe('1');
});