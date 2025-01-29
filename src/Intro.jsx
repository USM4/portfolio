import React from "react";
import { motion } from "framer-motion";

const skills = [
  {
    name: "React",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    x: -180,
    y: 0,
    delay: 0,
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    x: -127,
    y: -127,
    delay: 0.2,
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    x: 0,
    y: -180,
    delay: 0.4,
  },
  {
    name: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    x: 127,
    y: -127,
    delay: 0.6,
  },
  {
    name: "Django",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
    x: 180,
    y: 0,
    delay: 0.8,
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    x: 127,
    y: 127,
    delay: 1,
  },
  {
    name: "Docker",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    x: 0,
    y: 180,
    delay: 1.2,
  },
  {
    name: "Git",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    x: -127,
    y: 127,
    delay: 1.4,
  },
];

function Intro() {
  return (
    <div
      id="home"
      className="flex w-full h-screen justify-center items-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-8">
          <motion.div
            className="relative group mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-400" />
            <div className="relative w-80 h-80">
              <img
                src="./oredoine.jpg"
                alt="Oussama Redoine"
                className="w-full h-full rounded-full object-cover border-4 border-blue-500/20 shadow-lg transform transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            
             
            </div>
          </motion.div>

          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <h1 className="font-mono text-stone-200 font-bold glowing-text text-5xl sm:text-6xl bg-clip-text">
                Hi, I'm Oussama Redoine
              </h1>
              <h2 className="font-mono font-bold text-2xl sm:text-3xl text-blue-700 transition duration-500">
                Full Stack Developer M9awd Chwya
              </h2>
            </div>

            <div className="pt-8">
              <h2 className="font-mono text-stone-200 font-bold glowing-text text-3xl sm:text-2xl relative inline-block group cursor-default">
                explore my world
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </h2>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1.5, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-transparent rounded-full animate-pulse" />
            
          </motion.div>
           <div className="absolute bottom-10 w-full overflow-hidden">
              <motion.div
                className="flex gap-8 py-2 bg-black border-t-4 border-b-4 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wide text-lg whitespace-nowrap"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              >
                {Array(2).fill(
                  skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4 px-4">
                      <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                      <span>{skill.name}</span>
                    </div>
                  ))
                )}
              </motion.div>
            </div>
         //////////////////////////////
        </div>
      </div>
    </div>
  );
}

export default Intro;

