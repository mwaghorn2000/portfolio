'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/backend/interfaces';
import { formatDate, readingTime } from '../../components/postUtils';
export default function Post({ _id }: { _id: string }) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [error, setError] = useState('');
    useEffect(() => {
        const controller = new AbortController();
        setPost(null); setError('');
        fetch(`/api/posts/${_id}`, { signal: controller.signal })
            .then(async response => { if (!response.ok) throw new Error(response.status === 404 ? 'This post could not be found.' : 'This post could not be loaded. Please try again.'); return response.json(); })
            .then(data => setPost(data.post))
            .catch(error => { if (!controller.signal.aborted) setError(error.message); });
        return () => controller.abort();
    }, [_id]);
    return <main className="blog-wrap max-w-4xl">
        <Link href="/Blog" className="text-sm font-semibold text-lime-700">← Back to the blog</Link>
        {error ? <div role="alert" className="blog-error mt-8">{error}</div> : !post ? <p role="status" className="blog-muted mt-8">Loading post…</p> : <article>
            <header className="mb-10 border-b border-stone-200 pb-8 pt-10">
                <p className="blog-eyebrow">Blog post</p>
                <h1 className="blog-title break-words">{post.title}</h1>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-500"><span>{post.author}</span><span>{formatDate(post.datePublished)}</span><span>{readingTime(post.content)} min read</span></div>
            </header>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="mt-12 border-t border-stone-200 pt-7"><Link href="/Blog" className="blog-secondary">View all posts →</Link></div>
        </article>}
    </main>;
}
