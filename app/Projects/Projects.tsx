import React from 'react';
import Image from 'next/image'

const Projects: React.FC = () => {
    return (
        <>
            <div className="about-me py-[20px] mx-auto subpixel-antialiased lg:py-[100px] w-full lg:w-full">
                <h1 className="py-3 text-2xl font-extrabold text-center">&lt;Projects /&gt;</h1>
                <h2 className="text-center pb-[35px]">Click on the images to go to the project</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-around mb-[20px] mx-[20px]'>
                    <div className='m-auto text-center h-[550px]'>
                        <a href="https://mwaghorn2000.github.io/calculator/" target="_blank">
                            <Image className="m-auto h-[363px]" src="/calculator.png" alt="Image of calculator project" width={360} height={360} />
                        </a>
                        <h2 className="text-xl py-3">Calculator</h2>
                        <p className='h-[120px]'>First project i made which used CSS, HTML, and JS. Was proud when i made this, it can even register keyboard inputs</p>
                    </div>
                    <div className='m-auto text-center h-[550px]'>
                        <a className="py-[133.8px]" href="https://github.com/mwaghorn2000/RISKIT" target="_blank">
                            <div className="py-[133.8px]">
                                <h1 className="text-8xl font-extrabold">RISKIT</h1>
                            </div>
                        </a>
                        <h2 className="text-xl py-3">RISKIT</h2>
                        <p className='h-[120px]'>
                            This is a online casino game im working on with two other students at UNSW.
                            <a className="text-lime-600 hover:text-lime-900 transition-colors duration-200" href="https://github.com/Yangstaboi" target='_blank'> William Yang </a>
                            and
                            <a className="text-lime-600 hover:text-lime-900 transition-colors duration-200" href="https://github.com/Arnold45202" target="_blank"> Jackson Wang</a>.
                            This is a full stack project, As of right now it&apos;s still a WIP, and the only game left is poker, which is the most complex part of the app.
                            It uses react, typescript, socket.io and firebase under the hood.
                        </p>
                    </div>
                    <div className='m-auto text-center h-[550px]'>
                        <a href="https://github.com/mwaghorn2000/portfolio" target="_blank">
                            <Image className="m-auto h-[363px]" src="/portfolio_img.png" alt="image of homepage of portfolio" width={360} height={360} />
                        </a>
                        <h2 className="text-xl py-3">My Portfolio</h2>
                        <p>
                            The website you are on right now. Using next.js for routing, and tailwindCSS for styling. Also features a blog which I use to discuss my projects, and
                            courses I take at UNSW.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects;