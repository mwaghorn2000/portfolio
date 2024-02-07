'use client'

import { BlogPost } from '@/backend/interfaces';
import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';

export default function Dashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch('/api/posts');
                if (!res.ok) {
                    throw new Error('Failed to fetch posts.');
                }
                const data = await res.json();
                setPosts(data.posts);
            } catch (error: any) {
                console.error('Error fetching posts', error);
            }
        }

        getPosts();
    }, []);

    const postComponents = posts.map((post) => (
        <PostItem
            key={post._id}
            title={post.title}
            _id={post._id}
        />
    ));


    return (
        <>
            {postComponents}
        </>
    )
}