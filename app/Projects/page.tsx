import NavBar from "../components/Nav/NavBar";
import Projects from "./Projects"
import Footer from "../components/Foot/Footer";
import React from "react";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Projects />
      <Footer />
    </div>
  );
}