import React from 'react';
import Image from 'next/image'

const AboutMe: React.FC = () => {
    return (
        <>
            <div className="about-me py-[20px] mx-auto subpixel-antialiased lg:py-[100px] w-full lg:w-3/5 max-w-[790px]">
                <h1 className="py-3 text-2xl font-extrabold text-center">&lt;About Me /&gt;</h1>
                <div className="flex flex-col lg:flex-row ">
                    <div className="lg:w-2/3 p-3">
                        <p className="text-justify">
                            Dolore qui eiusmod elit incididunt amet non amet ex sunt. Do cillum fugiat minim et proident voluptate sint veniam. Cillum fugiat amet consequat aliqua duis ea consectetur amet.

                            Quis ullamco anim excepteur voluptate deserunt ut velit in cupidatat id. Culpa laboris tempor nostrud et incididunt aliquip est et elit laborum dolor. Do nulla ipsum exercitation officia. Incididunt id consectetur aute eiusmod do minim amet tempor ad fugiat sit dolore. Ullamco qui sunt deserunt do. Est officia dolor irure officia do ad et dolor anim pariatur ad sint do aliquip. Irure nulla quis nisi sit irure officia exercitation qui commodo anim pariatur.

                            Id velit proident laborum ad non nulla consequat pariatur. Dolor qui dolor cillum consequat laborum pariatur consequat culpa elit. Aute aliqua ad cupidatat sit fugiat laboris eiusmod commodo ex. Anim eu nostrud exercitation nostrud in do.
                        </p>
                    </div>
                    <div className="lg:w-1/3 p-3 m-auto">
                        <Image
                            src="/about_me_photo.jpg"
                            alt="Photo of myself and my partner in the Hunter"
                            width={300}
                            height={500}
                            layout="intrinsic" // This will maintain the aspect ratio
                        />
                    </div>
                </div>
                <div className="flex justify-between px-3 py-[50px] w-full lg:w-1/2 mx-auto">
                    <Image
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                        alt="JS logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                        alt="JS logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                        alt="JS logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg"
                        alt="JS logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg"
                        alt="JS logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
                        alt="JS logo"
                        width={50}
                        height={50}
                    />
                </div>
            </div>
        </>


    );
}

export default AboutMe