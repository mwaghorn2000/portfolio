'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Logout() {
    const router = useRouter();
    const [error, setError] = useState(false);
    return <div><button className="blog-secondary" onClick={async () => {
        try { const response = await fetch('/api/logout', { method: 'POST' }); if (!response.ok) throw new Error(); router.replace('/Blog/Login'); router.refresh(); }
        catch { setError(true); }
    }}>Sign out</button>{error && <p role="alert" className="text-xs text-red-700">Could not sign out. Try again.</p>}</div>;
}
