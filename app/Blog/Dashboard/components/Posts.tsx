'use client'

import { BlogPost } from '@/backend/interfaces';
import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';

export default function Dashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [displayWarning, setDisplayWarning] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

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

    const deletePost = async (_id: string) => {
        try {
            const res = await fetch(`/api/posts/dashboard/DeletePost/${_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Error deleting post');
            }
            const updatedPosts = posts.filter(post => post._id !== _id);
            setPosts(updatedPosts);
        } catch (error: any) {
            console.error('Error Deleting post', error);
        }
    }


    useEffect(() => {
        getPosts();
    }, []);

    const handleDeletePost = (_id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (!isConfirmed) {
            return; // Stop if the user clicks "Cancel"
        }
        deletePost(_id);
    }

    const postComponents = posts.map((post) => (
        <PostItem
            key={post._id}
            title={post.title}
            _id={post._id}
            handleDeletePost={handleDeletePost}
        />
    ));


    return (
        <>
            {postComponents}
        </>
    )
}