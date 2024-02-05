'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PostForm: React.FC = () => {
    const router = useRouter()

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/posts/CreatePost', {
                method: 'POST',
                body: JSON.stringify({ title: title, author: author, content: content}),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (res.ok) {
                router.replace('/Blog/Dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="w-2/3 m-auto">
                <h1 className="text-center text-2xl font-extrabold my-[5rem]">Create Post</h1>
                <form onSubmit={handleSubmit} className="">
                    <div className="">
                        <label className="font-bold" htmlFor="title">Title<br /></label>
                        <input
                            className="border-[1px] border-b-[3px] w-full rounded-md h-[40px] focus:border-lime-600 outline-none px-[10px] my-4"
                            id="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label className="font-bold" htmlFor="author">Author<br /></label>
                        <input
                        className="border-[1px] border-b-[3px] w-full rounded-md h-[40px] focus:border-lime-600 outline-none px-[10px] my-4"
                            id="author"
                            type="text"
                            placeholder="John Smith"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                        <label className="font-bold" htmlFor="content">Content<br /></label>
                        <textarea
                            id="content"
                            name="blog-post"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="resize-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-64"
                            placeholder="Write your blog post here... We use Markdown!"
                        ></textarea>
                        <div className='text-center mb-[90px] mt-[70px]'>
                            <button className="h-[50px] w-[300px] bg-lime-400 rounded-xl font-bold" type="submit">Submit Post</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default PostForm;