'use client'

import React from "react";
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";

const NavBar: React.FC = () => {
    const pathName = usePathname();

    const isActive = (path: string): boolean => {
        return pathName === path;
    };

    return (
        <>
            <div className='header flex justify-between m-auto py-3.5 top-0 px-0 sticky z-50 bg-white'>
                <ul className="nav list-none  flex w-full justify-center">
                    <li className={`mr-2.5 transition-colors duration-200 hover:text-lime-600 ${isActive('/AboutMe') ? 'active text-lime-600' : ''}`} ><Link href='/AboutMe'>About Me 😎</Link></li>
                    <li className={`mr-2.5 transition-colors duration-200 hover:text-lime-600 ${isActive('/Projects') ? 'active text-lime-600' : ''}`}><Link href='/Projects'>Projects 🚀</Link></li>
                    <li className={`mr-2.5 transition-colors duration-200 hover:text-lime-600 ${isActive('/Resume') ? 'active text-lime-600' : ''}`}><Link href='/Resume'>Resume 📄</Link></li>
                    <li className={`transition-colors duration-200 hover:text-lime-600 ${isActive('/Blog') ? 'active text-lime-600' : ''}`}><Link href='/Blog'>blog ✍️</Link></li>
                </ul>
            </div>

            <style jsx>{`
                .active {
                    text
                }

                .nav li:not(:last-child)::after {
                    content: " / ";
                    margin-left: 7px;
                    color: black;
                }
            `}</style>
        </>

    );
}

export default NavBar;