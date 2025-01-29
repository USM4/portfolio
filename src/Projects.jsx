import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Github,
  ExternalLink,
  Code2,
  Package,
  Server,
  Database,
  Bot,
  Globe,
} from "lucide-react";

const ProjectCard = ({ title, details, github, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group w-full max-w-md aspect-[4/3] [perspective:1000px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isHovered ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <div className="w-full h-full bg-slate-800/30 backdrop-blur-lg border border-blue-500/30 rounded-xl p-8 flex flex-col items-center justify-center gap-6 group-hover:border-blue-500/60 transition-all duration-300">
            <Icon className="w-16 h-16 text-blue-400" />
            <h3 className="text-2xl font-bold text-white text-center bg-clip-text">
              {title}
            </h3>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full inset-0 bg-gradient-to-r from-blue-700/10 via-purple-400/10 to-black-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="w-full h-full bg-slate-800/30 backdrop-blur-lg border border-blue-500/30 rounded-xl p-6 flex flex-col group-hover:border-blue-500/60 transition-all duration-300">
            <div className=" inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <h3 className="text-xl font-bold p-2 text-white mb-4">{title}</h3>
            <p className="text-gray-300 flex-grow text-sm leading-relaxed ">
              {details}
            </p>
            <div className="mt-4 flex justify-end">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors duration-300"
              >
                <Github className="w-4 h-4 cursor-pointer" />
                <span className="text-sm">View On Github</span>
                <ExternalLink className="w-3 h-3 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Projects() {
  const projects = [
    {
      title: "ShellCraft",
      details:
        "own miniature shell to command the terminal like a pro. A simple shell implementation designed to mimic key terminal functionalities.",
      github: "https://github.com/USM4/mshell",
      icon: Code2,
    },
    {
      title: "C++ Mastery Journey",
      details:
        "Embark on a comprehensive journey to master advanced C++ concepts. Error handling to templates, algorithms, and beyond.",
      github: "https://github.com/USM4/cppv2",
      icon: Package,
    },
    {
      title: "Docker Dominion",
      details:
        "Build and manage your virtualized environments using Docker. Expand your knowledge of system administration with Docker-based virtualization.",
      github: "https://github.com/USM4/Inception",
      icon: Server,
    },
    {
      title: "DevOps Pipeline",
      details:
        "A milestone challenge testing all your accumulated programming skills. Showcase your capabilities through rigorous, real-world scenarios.",
      github: "https://github.com/USM4/hh",
      icon: Database,
    },
    {
      title: "ChatterBox",
      details:
        "own IRC server to manage real-time chat connections. Create a fully functional IRC server in C++, compatible with official clients.",
      github: "https://github.com/USM4/ft_irc",
      icon: Bot,
    },
    {
      title: "Smash Pong",
      details:
        "Design and deploy a full-stack web app from scratch with modern technologies. An end-to-end project featuring frontend, backend, and deployment skills.",
      github: "https://github.com/USM4/ft_transcendence",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4" id="projects">
      <div className="relative mb-16 text-center">
        <h2 className="font-mono text-stone-200 font-bold glowing-text text-6xl">
          Projects
        </h2>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              details={project.details}
              github={project.github}
              icon={project.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
