import React from "react";
import { motion } from "framer-motion";
import Resume from "/Oussama_Redoine_Resume.pdf";

const skills = [
  {
    name: "React",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    x: -180,
    y: 0,
    delay: 0,
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    x: 127,
    y: 127,
    delay: 0.1,
  },
  {
    name: "Docker",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    x: 0,
    y: 180,
    delay: 0.2,
  },
  {
    name: "Git",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    x: -127,
    y: 127,
    delay: 0.3,
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    x: -127,
    y: -127,
    delay: 0.4,
  },
  {
    name: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    x: 127,
    y: -127,
    delay: 0.5,
  },
  {
    name: "Django",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
    x: 180,
    y: 0,
    delay: 0.6,
  },
];

function Intro() {
  return (
    <div
      id="home"
      className="flex w-full h-screen justify-center items-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="relative group mb-4 z-20"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-300 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-400" />
            {/* Smaller image container on mobile */}
            <div className="relative w-40 h-40 md:w-64 md:h-64">
              <img
                src="./oredoine.jpg"
                alt="Oussama Redoine"
                className="w-full h-full rounded-full object-cover border-4 border-blue-500/20 shadow-lg transform transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-2">
              {/* Reduced text sizes for mobile */}
              <h1 className="font-mono text-stone-200 font-bold glowing-text text-3xl md:text-5xl lg:text-7xl bg-clip-text">
                I'm Oussama Redoine
              </h1>
              <h2 className="font-mono font-bold text-lg md:text-2xl lg:text-3xl text-blue-700 transition duration-500">
                Full-Stack Developer | Always Improving
              </h2>
            </div>
            <div className="w-full">
              <button className="text-blue-800 border-2 border-blue-800 px-2 py-1 md:px-4 md:py-2 md:text-lg lg:px-8 lg:py-4 lg:text-xl rounded-xl hover:bg-blue-800 hover:text-black font-mono font-bold transition-colors duration-300">
                <a href={Resume} target="blank">
                  Resume
                </a>
              </button>
            </div>
            <div className="pt-4">
              <h2 className="font-mono text-stone-200 font-bold glowing-text text-xl md:text-3xl lg:text-4xl relative inline-block group cursor-default">
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </h2>
            </div>
          </motion.div>
          <div className="absolute p-16 md:p-32 z-0 w-full">
            <motion.div
              className="flex w-max gap-6 py-2 bg-black border-t-4 border-b-4 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wide text-sm md:text-lg whitespace-nowrap"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {Array(3).fill(
                skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-2 hover:scale-110 transition-transform duration-300"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                    <span>{skill.name}</span>
                  </div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
