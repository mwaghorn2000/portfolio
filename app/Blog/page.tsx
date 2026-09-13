import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Foot/Footer';
import PostMenu from './components/PostMenu';
import Link from 'next/link';
export default function Blog() {
    return <><NavBar /><main className="blog-wrap">
        <header className="mb-12 flex flex-wrap items-start justify-between gap-6 border-b border-stone-200 pb-10">
            <div><p className="blog-eyebrow">Mitchell Waghorn / Journal</p><h1 className="blog-title">Notes along<br />the way<span className="text-lime-600">.</span></h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-stone-600">Projects, university, and other things.</p></div>
            <Link href="/Blog/Login" className="blog-secondary">Author login <span aria-hidden="true">↗</span></Link>
        </header><PostMenu />
    </main><Footer /></>;
}
