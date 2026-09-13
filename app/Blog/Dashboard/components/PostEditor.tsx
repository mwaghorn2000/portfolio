'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/backend/interfaces';
import { plainText, readingTime } from '../../components/postUtils';
type Draft = { title: string; content: string };
export default function PostEditor({ post }: { post?: BlogPost }) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title ?? '');
    const [content, setContent] = useState(post?.content ?? '');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(false);
    const [html, setHtml] = useState('');
    const [previewLoading, setPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState('');
    const [recovery, setRecovery] = useState<Draft | null>(null);
    const [draftStatus, setDraftStatus] = useState('');
    const [ready, setReady] = useState(false);
    const textarea = useRef<HTMLTextAreaElement>(null);
    const published = useRef(false);
    const key = `mw-journal-draft:${post?._id ?? 'new'}`;
    const dirty = title !== (post?.title ?? '') || content !== (post?.content ?? '');
    useEffect(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                const draft = JSON.parse(saved);
                if (typeof draft.title === 'string' && typeof draft.content === 'string' && (draft.title !== (post?.title ?? '') || draft.content !== (post?.content ?? ''))) setRecovery(draft);
            }
        } catch { setDraftStatus('Local draft storage is unavailable. Keep a copy before leaving.'); }
        setReady(true);
    }, [key, post]);
    useEffect(() => {
        if (!ready || recovery || !dirty || published.current) return;
        const timeout = setTimeout(() => {
            if (published.current) return;
            try { localStorage.setItem(key, JSON.stringify({ title, content })); setDraftStatus('Draft saved on this device'); }
            catch { setDraftStatus('Could not save a local draft. Keep a copy before leaving.'); }
        }, 600);
        return () => clearTimeout(timeout);
    }, [title, content, key, ready, recovery, dirty]);
    useEffect(() => {
        if (!dirty) return;
        const warn = (event: BeforeUnloadEvent) => { if (!published.current) { event.preventDefault(); event.returnValue = ''; } };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);
    useEffect(() => {
        if (!preview) return;
        const controller = new AbortController();
        setPreviewLoading(true); setPreviewError('');
        fetch('/api/posts/dashboard/preview', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ content }), signal: controller.signal })
            .then(async response => { if (!response.ok) throw new Error(response.status === 401 ? 'Sign in again to preview your post.' : 'Preview is unavailable. Your writing is still here.'); return response.json(); })
            .then(data => setHtml(data.html))
            .catch(error => { if (!controller.signal.aborted) setPreviewError(error.message); })
            .finally(() => { if (!controller.signal.aborted) setPreviewLoading(false); });
        return () => controller.abort();
    }, [preview, content]);
    function insert(before: string, after = '', placeholder = 'text') {
        const input = textarea.current;
        if (!input) return;
        const start = input.selectionStart, end = input.selectionEnd;
        const selected = content.slice(start, end) || placeholder;
        setContent(content.slice(0, start) + before + selected + after + content.slice(end));
        requestAnimationFrame(() => { input.focus(); input.setSelectionRange(start + before.length, start + before.length + selected.length); });
    }
    async function save(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy) return;
        if (!title.trim() || !content.trim()) { setError('Add a title and some content before publishing.'); return; }
        setBusy(true); setError('');
        try {
            const response = await fetch(post ? `/api/posts/UpdatePost/${post._id}` : '/api/posts/CreatePost', {
                method: post ? 'PUT' : 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ title: title.trim(), content, author: 'Mitchell Waghorn' }),
            });
            if (!response.ok) {
                if (response.status === 401) throw new Error('Your session expired. Your draft stays on this device; sign in again to publish.');
                const result = await response.json().catch(() => ({}));
                throw new Error(result.error || 'Your post could not be saved. Please try again.');
            }
            published.current = true;
            try { localStorage.removeItem(key); } catch { /* The post is saved even if browser storage is unavailable. */ }
            router.replace('/Blog/Dashboard'); router.refresh();
        } catch (error) { setError(error instanceof Error ? error.message : 'Save failed.'); setBusy(false); }
    }
    const words = plainText(content).split(/\s+/).filter(Boolean).length;
    const formatting = [
        { label: 'Bold', before: '**', after: '**', text: 'bold text' },
        { label: 'Italic', before: '*', after: '*', text: 'italic text' },
        { label: 'Heading', before: '\n## ', after: '\n', text: 'Heading' },
        { label: 'Link', before: '[', after: '](https://example.com)', text: 'link text' },
        { label: 'List', before: '\n- ', after: '\n', text: 'List item' },
        { label: 'Code', before: '\n' + String.fromCharCode(96).repeat(3) + '\n', after: '\n' + String.fromCharCode(96).repeat(3) + '\n', text: 'code' },
        { label: 'Image', before: '![', after: '](https://example.com/image.jpg)', text: 'Image description' },
    ];
    return <main className="blog-wrap">
        <Link href="/Blog/Dashboard" className="text-sm font-semibold text-lime-700">← All posts</Link>
        <form onSubmit={save} className="mt-7">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="blog-eyebrow">Post editor</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight">{post ? 'Edit post' : 'Create post'}</h1></div><button className="blog-button" disabled={busy || !!recovery}>{busy ? 'Saving…' : post ? 'Save changes' : 'Publish post →'}</button></header>
            {recovery && <div className="mb-5 rounded-xl border border-lime-300 bg-lime-50 p-5"><p className="font-semibold">You have a saved local draft.</p><p className="blog-muted mt-1">Restore your unfinished writing, or discard the local copy to continue.</p><div className="mt-3 flex gap-3"><button type="button" className="blog-button" onClick={() => { setTitle(recovery.title); setContent(recovery.content); setRecovery(null); }}>Restore draft</button><button type="button" className="blog-secondary" onClick={() => { try { localStorage.removeItem(key); } catch {} setRecovery(null); }}>Discard local draft</button></div></div>}
            {error && <p role="alert" className="blog-error mb-5">{error} <Link href="/Blog/Login" className="underline">Author login</Link></p>}
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="blog-panel min-w-0">
                    <label htmlFor="post-title" className="mb-2 block text-sm font-semibold">Post title</label>
                    <input id="post-title" className="blog-input text-xl font-bold" placeholder="Enter a post title…" value={title} maxLength={120} onChange={event => setTitle(event.target.value)} required disabled={busy || !!recovery} />
                    <div className="mb-6 mt-2 text-right text-xs text-stone-500">{title.length}/120</div>
                    <div className="mb-3 flex items-center justify-between gap-3"><label htmlFor="post-content" className="text-sm font-semibold">Post content</label><div className="flex gap-2"><button type="button" aria-pressed={!preview} className={!preview ? 'blog-button !px-3 !py-2' : 'blog-secondary !px-3 !py-2'} onClick={() => setPreview(false)}>Write</button><button type="button" aria-pressed={preview} className={preview ? 'blog-button !px-3 !py-2' : 'blog-secondary !px-3 !py-2'} onClick={() => setPreview(true)}>Preview</button></div></div>
                    {!preview ? <><div className="flex flex-wrap gap-2 rounded-t-xl border border-b-0 border-stone-300 bg-stone-50 p-2">
                        {formatting.map(item => <button key={item.label} type="button" disabled={busy || !!recovery} className="rounded-md px-2 py-1 text-xs font-semibold hover:bg-stone-200" onClick={() => insert(item.before, item.after, item.text)}>{item.label}</button>)}
                    </div><textarea ref={textarea} id="post-content" className="blog-input min-h-[460px] resize-y rounded-t-none font-mono text-sm leading-7" placeholder="Start writing here. Markdown is supported." value={content} maxLength={200000} onChange={event => setContent(event.target.value)} disabled={busy || !!recovery} /></> :
                    <div className="min-h-[460px] rounded-xl border border-stone-200 p-5" aria-label="Post preview">{previewLoading ? <p role="status" className="blog-muted">Preparing preview…</p> : previewError ? <p role="alert" className="blog-error">{previewError}</p> : content.trim() ? <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} /> : <p className="blog-muted">Your preview will appear once you start writing.</p>}</div>}
                    <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-stone-500"><span>{words} words · {readingTime(content)} min read</span><span role="status">{draftStatus}</span></div>
                </div>
                <aside className="space-y-5"><div className="blog-panel"><h2 className="font-bold">Publishing details</h2><p className="blog-muted mt-3">Author: Mitchell Waghorn</p><p className="blog-muted mt-3">{post ? 'Saving applies these changes to the published post immediately.' : 'Publishing adds this post to the public blog immediately.'}</p><p className="blog-muted mt-3">Unpublished changes are saved in this browser only.</p></div><div className="blog-panel"><h2 className="font-bold">Before publishing</h2><ul className="blog-muted mt-3 list-disc space-y-2 pl-4"><li>Use headings to organise longer posts.</li><li>Check formatting in Preview.</li><li>Add descriptions to images.</li><li>Review the title and links.</li></ul></div></aside>
            </div>
        </form>
    </main>;
}
