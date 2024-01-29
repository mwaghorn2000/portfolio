import React from 'react';
import Image from 'next/image'

const Projects: React.FC = () => {
    return (
        <>
            <div className="about-me py-[20px] mx-auto subpixel-antialiased lg:py-[100px] w-full lg:w-full">
                <h1 className="py-3 text-2xl font-extrabold text-center">&lt;Projects /&gt;</h1>
                <h2 className="text-center pb-[35px]">Click on the images to go to the project</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-evenly'>
                    <div className='m-auto text-center'>
                        <a href="https://mwaghorn2000.github.io/calculator/" target="_blank"><Image className="m-auto" src="/../../../calculator.png" alt="sampleImage" width={360} height={360} /></a>
                        <h2 className="text-xl py-3">Calculator</h2>
                        <p>First project i made which used CSS, HTML, and JS. Was proud when i made this, it can even register keyboard inputs</p>
                    </div>
                    <div className='m-auto text-center'>
                        <a href="https://mwaghorn2000.github.io/calculator/" target="_blank"><Image className="m-auto" src="/../../../calculator.png" alt="sampleImage" width={360} height={360} /></a>
                        <h2 className="text-xl py-3">Calculator</h2>
                        <p>First project i made which used CSS, HTML, and JS. Was proud when i made this, it can even register keyboard inputs</p>
                    </div>
                    <div className='m-auto text-center'>
                        <a href="https://mwaghorn2000.github.io/calculator/" target="_blank"><Image className="m-auto" src="/../../../calculator.png" alt="sampleImage" width={360} height={360} /></a>
                        <h2 className="text-xl py-3">Calculator</h2>
                        <p>First project i made which used CSS, HTML, and JS. Was proud when i made this, it can even register keyboard inputs</p>
                    </div>
                    <div className='m-auto text-center'>
                        <a href="https://mwaghorn2000.github.io/calculator/" target="_blank"><Image className="m-auto" src="/../../../calculator.png" alt="sampleImage" width={360} height={360} /></a>
                        <h2 className="text-xl py-3">Calculator</h2>
                        <p>First project i made which used CSS, HTML, and JS. Was proud when i made this, it can even register keyboard inputs</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects;