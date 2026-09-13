const projects = [
    {
        name: 'Oscillite',
        category: 'Embedded audio',
        href: 'https://github.com/mwaghorn2000/Oscillite',
        description: 'A work-in-progress C++ library for generating audio waveforms on embedded systems. It supports sine, square, sawtooth, and triangle waves, with adjustable frequency and pulse width.',
        detail: 'Built around a phase accumulator with Q8.8 fixed-point output and no heap allocation, it is designed for microcontrollers, compact synthesizers, and DSP experiments.',
        technologies: ['C++', 'DSP', 'Fixed-point arithmetic'],
    },
    {
        name: 'ARM home automation system',
        category: 'Embedded systems',
        href: 'https://github.com/mwaghorn2000/DESN2000-Project',
        description: 'A touchscreen home automation system designed for guests staying at a cottage in Jindabyne. It brings together a doorbell, automated blinds, and a scheduled smart plug.',
        detail: 'The system uses light levels and time-based controls for the blinds, with LED indicators showing their position. A touchscreen provides Away, Sleep, Normal, and Manual modes, alongside a manual override for the smart plug.',
        technologies: ['C', 'ARM', 'Touchscreen', 'Sensors'],
    },
    {
        name: 'RISKIT',
        category: 'Web application',
        href: 'https://github.com/mwaghorn2000/RISKIT',
        description: 'An online casino game I developed with fellow students at UNSW. The project brings together a variety of casino games in a shared web application.',
        detail: 'Built with React and TypeScript, using Socket.IO and Firebase.',
        technologies: ['React', 'TypeScript', 'Socket.IO', 'Firebase'],
    },
];

export default function Projects() {
    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-5 pb-28 subpixel-antialiased lg:pt-[100px]">
            <h1 className="py-3 text-center text-2xl font-extrabold">&lt;Projects /&gt;</h1>
            <p className="mb-10 mt-2 text-center text-gray-600">
                A selection of my software and electronics projects.
            </p>
            <div className="border-t border-gray-200">
                {projects.map((project, index) => (
                    <article
                        key={project.name}
                        aria-labelledby={`project-${index}`}
                        className="grid grid-cols-1 gap-5 border-b border-gray-200 py-8 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-10 sm:py-10"
                    >
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lime-700">
                                {project.category}
                            </p>
                            <h2 id={`project-${index}`} className="text-3xl font-extrabold">
                                {project.name}
                            </h2>
                        </div>
                        <div>
                            <p className="leading-relaxed text-gray-800">{project.description}</p>
                            <p className="mt-3 leading-relaxed text-gray-600">{project.detail}</p>
                            <ul aria-label={`${project.name} technologies`} className="mt-5 flex flex-wrap gap-2">
                                {project.technologies.map(technology => (
                                    <li key={technology} className="rounded-md bg-lime-50 px-3 py-1 text-sm font-medium text-lime-800">
                                        {technology}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.name} on GitHub (opens in a new tab)`}
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold transition-colors hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-700"
                            >
                                View on GitHub <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
