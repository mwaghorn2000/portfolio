'use client'

import React, { useEffect, useState } from 'react';
import { PostThumbNail } from './PostThumbnail';
import Loading from '../loading';
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
        <Link href={`/Blog/${post._id}`}>
            <PostThumbNail
                key={post._id} // Assuming `post.id` is a unique identifier
                title={post.title}
                author={post.author}
                datePublished={post.datePublished}
                likes={post.likes}
            />
        </Link>

    ));


    return (
        <>
            <div className="border-2 rounded-xl border-lime-600 w-2/3 mx-auto">
                {loading ? <Loading /> : postComponents}
            </div>
        </>
    )
}

export default PostMenu;