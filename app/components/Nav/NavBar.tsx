import React from "react";
import Link from 'next/link';

const NavBar: React.FC = () => {
    return (
        <div className ='header flex w-[80%] justify-between m-auto py-3.5 px-0'>
            <ul className="nav list-none  flex w-full justify-center ">
                <li className="mr-2.5"><Link href=''>About Me 😎</Link></li>
                <li className="mr-2.5"><Link href=''>Projects 🚀</Link></li>
                <li className="mr-2.5"><Link href=''>Resume 📄</Link></li>
                <li><Link href=''>blog ✍️</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;