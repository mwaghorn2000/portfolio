'use client'

import React from 'react';
import Posts from './Posts'
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter()

    const handleCreatePost = () => {
        router.push('/Blog/Dashboard/CreatePost')
    }

    return (
        <>
            <div>
                <div className="text-4xl font-extrabold mx-auto text-center py-[5rem]">&lt; Dashboard /&gt;</div>
                <div className="text-center">
                    <button className="h-[40px] w-[120px] bg-lime-400 rounded-xl m-5 hover:bg-lime-500 active:bg-lime-400" onClick={handleCreatePost}>Create Post</button>
                    <Posts />
                </div>
            </div>
        </>
    )
}