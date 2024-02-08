'use client'

import React, { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import { BlogPost } from "@/backend/interfaces";

export default function Page({ params }: { params: { postId: string } }) {
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {

            try {
                const res = await fetch(`/api/posts/dashboard/${params.postId}`);
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
    }, [params.postId]);
    
    return (
        <>
            <div>
                <PostForm title={post ? post.title : ''} author={post ? post.author : ''} content={post ? post.content : ''} _id={post ? post._id : ''}/>
            </div>
        </>
    )
}