'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import create from './action';

const LoginForm = () => {
    // State to store the username and password
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState< string | null >(null);

    // Function to handle form submission
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submit action
        // Here, you can add your logic to send the username and password to your server
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username: username, password: password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (res.ok) {
                const token = await res.json();
                await create(token);
                setRedirect('/Blog/Dashboard');
            } else {
                
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (redirect) {
           router.push(redirect); 
        }
    }, [redirect]);

    return (
        <>
            <div className="form-container absolute top-1/2 m-0 left-1/2 translate-x-[-50%] translate-y-[-50%]  w-[28rem] rounded-[1rem]">
                <h1 className="text-3xl font-extrabold text-center py-[5rem]">Login</h1>
                <form onSubmit={handleSubmit} className="px-[3rem]">
                    <div className="mb-[2rem]">
                        <label className="font-bold" htmlFor="username">Username<br /></label>
                        <input
                            className='border-[1px] border-b-[3px] w-full rounded-md h-[40px] focus:border-lime-600 outline-none px-[10px]'
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-[2rem]">
                        <label className="font-bold" htmlFor="password">Password<br /></label>
                        <input
                            className='border-[1px] border-b-[3px] w-full rounded-md h-[40px] focus:border-lime-600 outline-none px-[10px]'
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='text-center mb-[90px] mt-[70px]'>
                        <button className="h-[50px] w-[300px] bg-lime-400 rounded-xl font-bold" type="submit">Login to Dashboard</button>
                    </div>
                </form>
            </div>
            <style>{`
                .form-container {
                    box-shadow: 0px 0px 88px -24px rgb(55 65 81);;
            `}</style>
        </>
    );
};

export default LoginForm;