'use client'

import React, { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import { BlogPost } from "@/backend/interfaces";

export default function page({ params }: { params: { postId: string } }) {
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {

            try {
                const res = await fetch(`http://localhost:3000/api/posts/dashboard/${params.postId}`);
                if (!res.ok) {
                    throw Error("Failed to fetch post");
                }   

                const data = await res.json();
                setPost(data.post);
            } catch (e: any) {
                throw Error("Something went wrong fetching post :(", e);
            }
        }

        fetchPost();
    }, []);

    // useEffect(() => {

    // }, [post]);

    return (
        <>
            <div>
                <PostForm title={post ? post.title : ''} author={post ? post.author : ''} content={post ? post.content : ''} _id={post ? post._id : ''}/>
            </div>
        </>
    )
}