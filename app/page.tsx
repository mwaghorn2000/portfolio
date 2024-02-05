'use client'
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="m-auto w-2/3 text-center absolute top-1/2 inset-x-0 -translate-y-2/3">
        <h1 className=" md:text-4xl lg:text-6xl sm:text-3xl text-2xl font-bold">&lt; Mitchell Waghorn /&gt;</h1>
        <h2 className="py-3 lg:text-4xl md:text-3x sm:text-2xl text-1xl mb-3.5">
          Welcome to my web portfolio<span className="typing-cursor ml-2">|</span>
        </h2>
        <Link className="py-3.5 px-[50px] bg-lime-400 text-center rounded-lg transition-colors hover:bg-lime-500 duration-300" href="/AboutMe">Enter </Link>
      </div>
      <style>{`
        .typing-cursor {
          animation: blink-cursor 1s steps(5, start) infinite;
        }
        @keyframes blink-cursor {
          from, to { color: transparent }
          50% { color: black }
        }
      `}</style>
    </>
  )
}
