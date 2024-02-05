import NavBar from '../../components/Nav/NavBar';
import Footer from '../../components/Foot/Footer';
import Post from './components/Post';
import React from 'react';


export default function Page({ params }: { params: { postId: string } }) {
  return (
    <>
      <div>
        <NavBar />
        <Post _id={params.postId} />
        <Footer />
      </div >
    </>
  );
}