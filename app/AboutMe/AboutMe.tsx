import Image from 'next/image';
import Link from 'next/link';

const technologies = [
    { name: 'C', icon: 'c' },
    { name: 'C++', icon: 'cplusplus' },
    { name: 'Rust', icon: 'rust' },
    { name: 'Python', icon: 'python' },
    { name: 'MATLAB', icon: 'matlab' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'React', icon: 'react' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'Codex', icon: 'codex' },
];

export default function AboutMe() {
    return (
        <main className="mx-auto max-w-5xl px-5 pb-28 pt-10 subpixel-antialiased sm:px-8 lg:pt-20">
            <div className="mb-10 flex items-center gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-700">About me</p>
                <div aria-hidden="true" className="h-px flex-1 bg-gray-200" />
            </div>

            <section aria-labelledby="about-heading" className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                    <p className="mb-3 text-sm font-medium text-gray-500">Electrical Engineering &amp; Computer Science · UNSW</p>
                    <h1 id="about-heading" className="text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl">
                        Hi, I&apos;m<br />
                        <span className="text-lime-700">Mitchell Waghorn.</span>
                    </h1>
                    <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
                        <p>
                            I&apos;m nearing the end of my third year studying Electrical Engineering and Computer Science at UNSW.
                        </p>
                        <p>
                            I enjoy figuring out how things work and building projects that put what I&apos;m learning into practice. This site is where I share those projects, along with occasional notes on university and what I&apos;m working on.
                        </p>
                        <p>
                            Outside uni, I enjoy cooking and trying new recipes. I also like tinkering with electronics and working on small projects of my own.
                        </p>
                    </div>
                    <Link
                        href="/Projects"
                        className="mt-7 inline-flex items-center gap-3 rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold transition-colors hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-700"
                    >
                        Explore my projects <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-[320px] md:mt-1">
                    <div className="rounded-3xl border border-lime-100 bg-lime-50 p-3">
                        <Image
                            src="/about-me-portrait.png"
                            alt="Portrait of Mitchell Waghorn"
                            width={1240}
                            height={1268}
                            sizes="(max-width: 767px) 296px, (max-width: 1023px) 256px, 296px"
                            priority
                            className="h-auto w-full rounded-2xl"
                        />
                    </div>
                </div>
            </section>

            <section aria-labelledby="technologies-heading" className="mt-14 border-t border-gray-200 pt-8 sm:mt-16">
                <h2 id="technologies-heading" className="text-xl font-bold tracking-tight text-gray-950">Technologies I work with</h2>
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                    {technologies.map(technology => (
                        <li key={technology.icon} className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-5">
                            <Image
                                src={`/technologies/${technology.icon}.svg`}
                                alt=""
                                width={36}
                                height={36}
                                className="h-9 w-9"
                            />
                            <span className="text-sm font-medium text-gray-700">{technology.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
