'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); if (busy) return;
        setBusy(true); setError('');
        try {
            const response = await fetch('/api/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username, password }) });
            if (!response.ok) throw new Error(response.status === 401 ? 'That username or password is incorrect.' : 'Sign-in is unavailable right now. Please try again.');
            router.replace('/Blog/Dashboard'); router.refresh();
        } catch (error) { setError(error instanceof Error ? error.message : 'Unable to sign in.'); }
        finally { setBusy(false); }
    }
    return <main className="blog-wrap max-w-5xl">
        <Link href="/Blog" className="text-sm font-semibold text-lime-700">← Back to the journal</Link>
        <div className="mt-10 grid overflow-hidden rounded-3xl border border-stone-200 bg-white md:grid-cols-2">
            <div className="flex flex-col justify-between bg-stone-900 p-8 text-white sm:p-12"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Mitchell Waghorn / Studio</p><h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight">Log in<br />to share<br /><span className="text-lime-300">Your Ideas.</span></h1></div><p className="mt-8 max-w-xs text-sm leading-7 text-stone-300">Your journal, your projects, your progress. Sign in to keep the story going.</p></div>
            <form onSubmit={submit} className="space-y-6 p-8 sm:p-12"><div><h2 className="text-2xl font-bold">Welcome back</h2><p className="blog-muted mt-2">Sign in to your author dashboard.</p></div>
                {error && <p role="alert" className="blog-error">{error}</p>}
                <div><label htmlFor="username" className="mb-2 block text-sm font-semibold">Username</label><input id="username" autoComplete="username" className="blog-input" required value={username} onChange={event => setUsername(event.target.value)} /></div>
                <div><label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label><input id="password" autoComplete="current-password" className="blog-input" required type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} /><button type="button" className="mt-2 text-xs font-medium text-stone-600 underline" onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide password' : 'Show password'}</button></div>
                <button className="blog-button w-full" disabled={busy}>{busy ? 'Signing in…' : 'Open writing studio →'}</button><p className="blog-muted text-center">Author access only.</p>
            </form>
        </div>
    </main>;
}
