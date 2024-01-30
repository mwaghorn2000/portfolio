import React from 'react';
import Image from 'next/image'

const Projects: React.FC = () => {
    return (
        <>
            <div className="about-me py-[20px] mx-auto subpixel-antialiased lg:py-[100px] w-full lg:w-full">
                <h1 className="py-3 text-2xl font-extrabold text-center">&lt;Projects /&gt;</h1>
                <h2 className="text-center pb-[35px] font-bold">Click on the images to go to the project</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-around mb-[60px] mx-[20px]'>
                    <div className='m-auto text-center sm:h-[550px] max-h-[650px] "'>
                        <a href="https://mwaghorn2000.github.io/calculator/" target="_blank">
                            <Image className="m-auto h-[363px]" src="/calculator.png" alt="Image of calculator project" width={360} height={360} />
                        </a>
                        <h2 className="text-xl py-3">Calculator</h2>
                        <p className=''>First project i made which used CSS, HTML, and JS. Was proud when i made this, it can even register keyboard inputs</p>
                    </div>
                    <div className='m-auto text-center sm:h-[550px]'>
                        <a className="py-[133.8px]" href="https://github.com/mwaghorn2000/RISKIT" target="_blank">
                            <div className="py-[133.8px]">
                                <h1 className="text-8xl font-extrabold">RISKIT</h1>
                            </div>
                        </a>
                        <h2 className="text-xl py-3">RISKIT</h2>
                        <p>
                            RISKIT, an online casino game developed by UNSW students Myself, 
                            <a className="text-lime-600 hover:text-lime-900 transition-colors duration-200" href="https://github.com/Yangstaboi" target='_blank'> William Yang</a>, 
                            and <a className="text-lime-600 hover:text-lime-900 transition-colors duration-200" href="https://github.com/Arnold45202" target="_blank"> Jackson Wang</a>. 
                            Our app, currently a work in progress, features a variety of casino games, with 
                            Poker as our upcoming addition. Built using <strong>React, TypeScript, Socket.IO, and Firebase</strong>, &quot;Riskit&quot; offers 
                            an engaging and dynamic gaming experience. This will be getting deployed once Poker is complete.
                        </p>
                    </div>
                    <div className='m-auto text-center sm:h-[550px] max-h-[650px]'>
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