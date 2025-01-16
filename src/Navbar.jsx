import React, { useState, useRef } from "react";
import "./App.css";
import { GoPerson } from "react-icons/go";
import Projects from './Projects.jsx'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const nextSectionRef = useRef(null)
  const [isClicked, setIsClicked] = useState(null);
  const navigate = useNavigate();
  
  const handleScrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start"});
    }
  };

  const handleClicked = (index) => {
    setIsClicked(index);
  };

  return (
    <>
      <div className="absolute w-full text-blue-700 flex">
        <div className="w-full text-blue-700 flex">
          <ul className="p-10 w-full flex flex-row justify-center cursor-pointer space-x-40">
            <li
              onClick={() => handleClicked(0)}
              className={`font-mono text-3xl font-bold glowing-text hover:text-stone-200 hover:scale-105 transition-all ${
                isClicked === 0 ? "border-b-4 border-blue-700 shadow-blue-700 glow-border" : ""
              }`}
            >
              <button onClick={() => navigate('/')}> Home </button>
            </li>
            <li
              onClick={() => handleClicked(1)}
              className={`font-mono text-3xl font-bold glowing-text hover:text-stone-200 hover:scale-105 transition-all ${
                isClicked === 1 ? "border-b-4 border-blue-700 shadow-blue-700 glow-border" : ""
              }`}
            >
              <button onClick={() => navigate('/projects')}> Projects </button>
            </li>
            <li
              onClick={() => handleClicked(2)}
              className={`font-mono text-3xl font-bold glowing-text hover:text-stone-200 hover:scale-105 transition-all ${
                isClicked === 2 ? "border-b-4 border-blue-700 shadow-blue-700 glow-border" : ""
              }`}
            >
              <button> Work </button>
            </li>
            <li
              onClick={() => handleClicked(3)}
              className={`font-mono text-3xl font-bold glowing-text hover:text-stone-200 hover:scale-105 transition-all ${
                isClicked === 3 ? "border-b-4 border-blue-700 shadow-blue-700 glow-border" : ""
              }`}
            >
              <button> Links </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex w-full h-screen justify-center items-center">
        <div className="text-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-mono text-stone-200 font-bold glowing-text text-6xl ">
              Hi, My name is Oussama Redoine
            </h1>
            <h2 className="font-mono text-stone-200 font-bold glowing-text text-3xl">
              Full Stack Developer M9awd Chwya
            </h2>
          </div>
          <div className="flex flex-col p-10">
            <button
              className="w-28 h-28 rounded-full border- flex items-center justify-center m-auto border-2 border-blue-700 hover:border-blue-500 shadow-lg hover:shadow-[0_0_15px_3px_rgba(45,38,202,0.8)] transition-all"
              onClick={handleScrollToNextSection}
            >
              <img src="./wolfbg.png" alt="Icon" className="w-26 h-26" />
            </button>
          </div>
          <h2 className="font-mono text-blue-800 font-bold glowing-text text-3xl">
              explore my world
            </h2>
        </div>
      </div>

      <div
        ref={nextSectionRef}
        className="w-screen h-full flex justify-center items-center "
      >
        <Projects/>
      </div>
    </>
  );
}

export default Navbar;
