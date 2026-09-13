import Link from 'next/link';
import Logout from './components/Logout';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <><header className="border-b border-stone-200 bg-white"><nav aria-label="Author navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8"><Link href="/Blog/Dashboard" className="font-extrabold tracking-tight">MW<span className="text-lime-600">.</span> <span className="ml-2 text-sm font-medium text-stone-500">Writing studio</span></Link><div className="flex items-center gap-4"><Link href="/Blog" className="text-sm font-medium">View journal ↗</Link><Logout /></div></nav></header>{children}</>;
}
