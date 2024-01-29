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
                            My name is Mitchell Waghorn and im a second year at UNSW, however i&apos;ve been passionate
                            about coding well before I started studying.
                            <br />
                            <br />
                            Outside of coding I enjoy spending time with my two cats, Coco and Lu, and traveling 
                            Australia with my partner. The photo is our last trip to the Hunter Valley, NSW.
                            <br />
                            <br />
                            Recently while at Uni I&apos;ve started learning chess, as i love the planning and strategy involved
                            and as my skills as a developer have increased me and friends spend a lot of time coming up with
                            ideas for future projects together.
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