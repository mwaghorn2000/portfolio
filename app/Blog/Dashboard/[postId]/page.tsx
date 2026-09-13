'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/backend/interfaces';
import PostEditor from '../components/PostEditor';
export default function Page({ params }: { params: { postId: string } }) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [error, setError] = useState('');
    useEffect(() => {
        const controller = new AbortController();
        setPost(null); setError('');
        fetch(`/api/posts/dashboard/${params.postId}`, { signal: controller.signal, cache: 'no-store' })
            .then(async response => { if (!response.ok) throw new Error(response.status === 401 ? 'Your session expired. Please sign in again.' : 'This post could not be loaded.'); return response.json(); })
            .then(data => setPost(data.post))
            .catch(error => { if (!controller.signal.aborted) setError(error.message); });
        return () => controller.abort();
    }, [params.postId]);
    if (error) return <main className="blog-wrap"><p role="alert" className="blog-error">{error}</p><Link href="/Blog/Dashboard" className="blog-secondary mt-5">Back to dashboard</Link><Link href="/Blog/Login" className="blog-secondary ml-3">Sign in</Link></main>;
    if (!post) return <main className="blog-wrap"><p role="status" className="blog-panel">Loading post…</p></main>;
    return <PostEditor key={post._id} post={post} />;
}
