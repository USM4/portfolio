import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Projects from "./Projects.jsx";
import Links from "./Links.jsx";
import About from "./About.jsx";
import Intro from "./Intro.jsx";

function Home() {
  const sections = ["home", "projects", "links", "about"];
  const hash = window.location.hash.replace("#", "");
  const sectionIndex = sections.indexOf(hash) === -1 ? 0 : sections.indexOf(hash);
  const [nextSection, setNextSection] = useState(sectionIndex + 1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollTo = (e, sectionName) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionName);

    console.log(targetSection);
    if (targetSection) {
      // Custom smooth scroll function
      const startPosition = window.pageYOffset;
      const targetPosition =
        targetSection.getBoundingClientRect().top + window.pageYOffset;
      const duration = 1500; // Adjust this value for desired speed
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutCubic =
          progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;

        window.scrollTo(
          0,
          startPosition + (targetPosition - startPosition) * easeInOutCubic
        );

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div>
      <div className="fixed bottom-8 w-full flex justify-center items-end">
        <button
          className="text-white p-2 w-28 h-28 rounded-full flex items-end m-auto border-2 border-blue-700 hover:border-blue-500 shadow-lg hover:shadow-[0_0_15px_3px_rgba(45,38,202,0.8)] transition-all"
          onClick={(e) => {
            handleScrollTo(e, sections[nextSection]);
            if (nextSection + 1 === sections.length) setNextSection(0);
            else setNextSection(nextSection + 1);
            console.log(
              "------------------------------------------------------>",
              nextSection
            );
          }}
        >
          <img src="./wolfbg.png" alt="Icon" className="w-26 h-26" />
        </button>
      </div>
      <Navbar />
      <Intro />
        <Projects />
      <Links />
      <About />
    </div>
  );
}
export default Home;
