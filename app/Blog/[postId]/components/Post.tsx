'use client'

import { BlogPost } from "../../../../backend/interfaces";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";;

interface PostProps {
    _id: string;
}

const Post: React.FC<PostProps> = ({
    _id
}) => {
    const router = useRouter();

    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
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
    }, [_id])

    let dateString = post?.datePublished;
    let formattedDate = "";
    if (dateString) {
        let dateObject = new Date(dateString);
        formattedDate = dateObject.toISOString().split('T')[0];
    }

    const handleBack = () => {
        router.back();
    }

    return (
        <>
            <div className=" md:w-2/3 md:m-auto mx-[20px]  ">
                <div className="title text-center my-[50px] grid md:grid-cols-6 items-center gap-4">
                    <div className="flex justify-start collapse md:visible">
                        <button onClick={handleBack} className="py-3 px-[25px] bg-lime-400 text-center rounded-lg transition-colors hover:bg-lime-500 duration-300">
                            <span className="material-symbols-outlined font-bold">
                                Back
                            </span>
                        </button>
                    </div>
                    <div className="col-span-4">
                        <h1 className="text-3xl font-extrabold">{post ? post.title : ""}</h1>
                        <h2 className="text-xl font-bold">{post ? post.author : ""}</h2>
                    </div>
                    <div className="flex justify-end collapse md:visible">
                        <button className=" py-3 px-[25px] bg-lime-400 text-center rounded-lg transition-colors hover:bg-lime-500 duration-300">
                            <span className="material-symbols-outlined font-bold">
                                Like
                            </span>
                        </button>
                    </div>
                </div>

                <div className="mb-[200px]">
                    <p className="m-auto prose prose-lg" dangerouslySetInnerHTML={{ __html: post?.content as string }}>
                    </p>
                </div>
            </div>
            <style>{`
                <style>
                .material-symbols-outlined {
                  font-variation-settings:
                  'FILL' 0,
                  'wght' 400,
                  'GRAD' 0,
                  'opsz' 24
                }
                </style>
            `}</style>
        </>
    )
}

export default Post;