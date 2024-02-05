import NavBar from "../components/Nav/NavBar";
import AboutMe from "./AboutMe";
import Footer from "../components/Foot/Footer";
import React from "react";


export default function Home() {
  return (
    <div>
      <NavBar />
      <AboutMe />
      <Footer />
    </div>
  );
}