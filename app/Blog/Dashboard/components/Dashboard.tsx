'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/backend/interfaces';
import { formatDate, plainText } from '../../components/postUtils';

export default function Dashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('newest');
    const [attempt, setAttempt] = useState(0);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
    useEffect(() => {
        const controller = new AbortController();
        setError(''); setLoading(true);
        fetch('/api/posts', { cache: 'no-store', signal: controller.signal })
            .then(async response => { if (!response.ok) throw new Error(); return response.json(); })
            .then(data => setPosts(data.posts))
            .catch(() => { if (!controller.signal.aborted) setError('Your posts could not be loaded. Please retry.'); })
            .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
    }, [attempt]);
    async function removePost() {
        if (!pendingDelete || deleting) return;
        setDeleting(pendingDelete._id); setError('');
        try {
            const response = await fetch(`/api/posts/dashboard/DeletePost/${pendingDelete._id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(response.status === 401 ? 'Your session expired. Sign in again before deleting.' : 'The post could not be deleted.');
            setPosts(current => current.filter(post => post._id !== pendingDelete._id));
            setPendingDelete(null);
        } catch (error) { setError(error instanceof Error ? error.message : 'Delete failed.'); }
        finally { setDeleting(null); }
    }
    const filtered = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : (sort === 'newest' ? -1 : 1) * (new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime()));
    return <main className="blog-wrap">
        <header className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="blog-eyebrow">Blog administration</p><h1 className="blog-title">Post dashboard<span className="text-lime-600">.</span></h1><p className="mt-4 text-stone-600">Create, review, edit, and remove published posts.</p></div>
            <Link href="/Blog/Dashboard/CreatePost" className="blog-button">+ Create post</Link>
        </header>
        <div className="my-9 grid gap-3 sm:grid-cols-3">
            <div className="blog-panel"><p className="blog-muted">Published posts</p><p className="mt-2 text-3xl font-bold">{loading || error ? '—' : posts.length}</p></div>
            <div className="blog-panel"><p className="blog-muted">Words published</p><p className="mt-2 text-3xl font-bold">{loading || error ? '—' : posts.reduce((total, post) => total + plainText(post.content).split(/\s+/).filter(Boolean).length, 0).toLocaleString()}</p></div>
            <div className="rounded-2xl bg-stone-900 p-6 text-white"><p className="text-sm font-semibold text-lime-300">Publishing workflow</p><p className="mt-2 text-sm leading-6 text-stone-300">Create a post, write in Markdown, review the preview, then publish it.</p></div>
        </div>
        <section aria-labelledby="manage-heading">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><h2 id="manage-heading" className="text-xl font-bold">Manage posts</h2><div className="flex w-full flex-wrap gap-3 sm:w-auto">
                <label className="flex-1"><span className="sr-only">Search posts</span><input type="search" className="blog-input" placeholder="Search by title…" value={query} onChange={event => setQuery(event.target.value)} /></label>
                <label><span className="sr-only">Sort posts</span><select className="blog-input" value={sort} onChange={event => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option></select></label>
            </div></div>
            {error && <div role="alert" className="blog-error mb-5">{error} <button onClick={() => setAttempt(value => value + 1)} className="underline">Retry loading</button></div>}
            {pendingDelete && <div role="region" aria-label="Confirm deletion" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-5"><h3 className="font-bold">Delete “{pendingDelete.title}”?</h3><p className="mt-2 text-sm text-red-800">This permanently removes the published post. It cannot be undone.</p><div className="mt-4 flex gap-3"><button disabled={!!deleting} className="blog-secondary" onClick={() => setPendingDelete(null)}>Cancel</button><button disabled={!!deleting} className="rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-50" onClick={removePost}>{deleting ? 'Deleting…' : 'Delete permanently'}</button></div></div>}
            {loading ? <p role="status" className="blog-panel blog-muted">Loading posts…</p> : !filtered.length && !error ? <div className="blog-panel py-12 text-center"><h3 className="text-xl font-bold">{query ? 'No posts found' : 'No posts published'}</h3><p className="blog-muted mt-2">{query ? 'Change or clear the search term.' : 'Select “Create post” to publish one.'}</p></div> :
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">{filtered.map(post => <article key={post._id} className="flex flex-wrap items-center justify-between gap-5 border-b border-stone-100 p-5 last:border-0 sm:p-6"><div className="min-w-0"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-lime-700">Published · {formatDate(post.datePublished)}</p><h3 className="break-words text-lg font-bold">{post.title}</h3></div><div className="flex flex-wrap gap-3"><Link href={`/Blog/${post._id}`} className="blog-secondary" aria-label={`Read ${post.title}`}>View</Link><Link href={`/Blog/Dashboard/${post._id}`} className="blog-secondary" aria-label={`Edit ${post.title}`}>Edit</Link><button className="px-2 text-sm font-medium text-red-700 underline-offset-4 hover:underline" aria-label={`Delete ${post.title}`} onClick={() => setPendingDelete(post)}>Delete</button></div></article>)}</div>}
        </section>
    </main>;
}
