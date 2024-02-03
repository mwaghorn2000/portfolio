'use client'

import React, { useEffect, useState } from 'react';
import { PostThumbNail } from './PostThumbnail';
import Link from 'next/link';
import { BlogPost } from '@/backend/interfaces';



const PostMenu: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data.posts);
            } catch (error: any) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
        setLoading(false); ''
    }, []);

    const postComponents = posts.map((post) => (
        <Link key={post._id} href={`/Blog/${post._id}`}>
            <PostThumbNail
                key={post._id} 
                title={post.title}
                author={post.author}
                datePublished={post.datePublished}
                likes={post.likes}
            />
        </Link>
    ));


    return (
        <>
            <div className=" mx-[15px] md:w-2/3 md:mx-auto lg:w-1/3">
                {postComponents}
            </div>
        </>
    )
}

export default PostMenu;