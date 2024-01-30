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
                            Hello! I'm <strong className="text-lime-700">Mitchell Waghorn</strong>, currently in my second year at UNSW. 
                            However, my journey into coding began long before my university studies, fueled by a deep-seated passion for 
                            technology and innovation.
                            <br />
                            <br />
                            When I'm not coding, I cherish the moments spent with my two cats, Coco and Lu, and exploring the
                            diverse landscapes of Australia with my partner. Our recent visit to the Hunter Valley, NSW, was
                            particularly memorable (See photo).
                            <br />
                            <br />
                            While at university, I've taken up chess, interested by its intricate planning and strategic depth. This
                            new interest aligns well with my growing expertise as a developer. Im now also among friends who share my enthusiasm
                            for technology, we often brainstorm and conceptualize future projects, each more exciting than the last.
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