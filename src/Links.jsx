import React, { useRef, useState } from "react";
import About from "./About.jsx";
import "./App.css";
import {
  Github,
  Linkedin,
  Pocket as Docker,
  BookOpen,
  Instagram,
  Code2,
  Newspaper,
  ExternalLink,
  Star,
  GitFork,
  Activity,
} from "lucide-react";

function Links() {
  const [activeCard, setActiveCard] = useState(null);

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/USM4",
      color: "hover:text-green-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/oussama-redoine-406828210",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/oussama_red1",
      color: "hover:text-cyan-400",
    },
  ];

  const stats = [
    {
      label: "Commits",
      value: "500+",
      icon: Activity,
      description: "Total contributions across all repositories",
    },
    {
      label: "Repos",
      value: "25",
      icon: GitFork,
      description: "Public repositories on GitHub",
    },
  ];

  const nextSectionRef = useRef(null);

  const handleScrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div id="links">
      <div className="w-full h-screen justify-center items-center">
        <div className="w-full h-full flex text-purple-600 items-center">
          <div className="w-full h-full justify-center text-white flex flex-col items-center py-16 px-4">
            {/* Header with animated gradient */}
            <div className="relative mb-16">
              <h1 className="font-mono text-stone-200 font-bold glowing-text text-6xl ">
                LINKS
              </h1>
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden bg-slate-800/50 hover:bg-slate-700/50 px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 ${link.color}`}
                >
                  <link.icon className="w-6 h-6 transition-transform group-hover:rotate-12" />
                  <span className="font-semibold">{link.label}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              ))}
            </div>

            {/* Enhanced Middle Section */}
            <div className="w-full max-w-4xl bg-slate-800/30 backdrop-blur-lg rounded-2xl p-10 mb-16 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* QR Code with animated border */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />
                  <div className="relative w-56 h-56 bg-slate-900 rounded-lg flex items-center justify-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/USM4"
                      alt="QR Code"
                      className="w-48 h-48 rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-8 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    GitHub Statistics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {stats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className={`relative group p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 cursor-pointer ${
                          activeCard === index ? "ring-2 ring-blue-500" : ""
                        }`}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <stat.icon className="w-6 h-6 text-blue-400 mb-2" />
                          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400 font-medium">
                            {stat.label}
                          </div>
                          {activeCard === index && (
                            <div className="absolute top-full mt-2 left-0 right-0 bg-slate-800 rounded-lg p-3 text-xs text-gray-300 z-10 transition-all duration-300">
                              {stat.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;
