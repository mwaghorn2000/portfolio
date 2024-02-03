'use client'

import { BlogPost } from "@/backend/interfaces";
import React, { useEffect, useState } from "react";

interface PostProps {
    _id: string;
}

const Post: React.FC<PostProps> = ({
    _id
}) => {
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            console.log(_id);
            try {
                const response = await fetch(`/api/posts/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data.post);
            } catch (error: any) {
                console.error("Error fetching post", error);
            }
        } 

        fetchPost();
    }, [])

    return (
        <div>
            <div className="title">
                <h1>{post ? post.title : ""}</h1>
                <h2>{post ? post.author : ""}</h2>
            </div>
            <div>
                <article>
                    {post ? post.content : ""}
                </article>
            </div>
        </div>
    )
}

export default Post;