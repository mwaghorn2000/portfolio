'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/backend/interfaces';
import { formatDate, plainText, readingTime } from './postUtils';

export default function PostMenu() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true); setError('');
        fetch('/api/posts', { signal: controller.signal, cache: 'no-store' })
            .then(async response => { if (!response.ok) throw new Error(); return response.json(); })
            .then(data => setPosts(data.posts.sort((a: BlogPost, b: BlogPost) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())))
            .catch(() => { if (!controller.signal.aborted) setError('The blog could not be loaded. Please try again shortly.'); })
            .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
    }, [attempt]);
    const filtered = posts.filter(post => (post.title + ' ' + plainText(post.content)).toLowerCase().includes(query.toLowerCase()));
    return <section aria-labelledby="posts-heading">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 id="posts-heading" className="text-xl font-bold">All posts <span className="ml-2 text-sm font-normal text-stone-500">{loading ? '' : posts.length}</span></h2>
            <label className="w-full sm:w-72"><span className="sr-only">Search posts</span><input type="search" className="blog-input" placeholder="Search posts…" value={query} onChange={e => setQuery(e.target.value)} /></label>
        </div>
        {loading ? <div role="status" className="blog-panel blog-muted">Loading posts…</div> : error ? <div role="alert" className="blog-error">{error} <button className="ml-2 underline" onClick={() => setAttempt(value => value + 1)}>Retry</button></div> : !filtered.length ? <div className="blog-panel py-16 text-center"><h3 className="text-xl font-bold">{query ? 'No posts found' : 'No posts published'}</h3><p className="blog-muted mt-2">{query ? 'Change or clear the search term.' : 'Published posts will appear here.'}</p></div> :
        <div className="space-y-4">{filtered.map((post, index) => <article key={post._id} className="group rounded-2xl border border-stone-200 bg-white transition hover:border-lime-400">
            <Link href={`/Blog/${post._id}`} className="grid gap-5 rounded-2xl p-6 sm:grid-cols-[140px_minmax(0,1fr)_32px] sm:p-8">
                <div className="blog-muted"><p>{formatDate(post.datePublished)}</p><p>{readingTime(post.content)} min read</p>{index === 0 && !query && <span className="mt-3 inline-block rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-800">Latest post</span>}</div>
                <div><h3 className="text-2xl font-bold tracking-tight group-hover:text-lime-700">{post.title}</h3><p className="mt-3 line-clamp-2 leading-7 text-stone-600">{plainText(post.content)}</p><p className="mt-4 text-sm text-stone-500">{post.author}</p></div>
                <span aria-hidden="true" className="text-2xl text-lime-700">↗</span>
            </Link></article>)}</div>}
    </section>;
}
