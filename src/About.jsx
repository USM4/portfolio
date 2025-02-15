import React from "react";
import {
  Clock,
  Heart,
  Book,
  Rocket,
  Award,
  Code,
  School,
  GraduationCap,
} from "lucide-react";

function About() {
  const milestones = [
    {
      year: 2019,
      title: "Baccalaureate in Science (Physics Specialization)",
      description:
        "Earned my degree and began exploring the world of programming, learning coding fundamentals.",
      icon: GraduationCap,
    },
    {
      year: 2021,
      title: "Diploma in Computer Engineering",
      description:
        "Graduated from the Higher School of Technology in Berrechid with a diploma in computer engineering.",
      icon: School,
    },
    {
      year: 2025,
      title: "Completed Common Core at 1337 Coding School",
      description:
        "Completed the core program at 1337 (42 Network), mastering problem-solving and advanced programming skills.",
      icon: GraduationCap,
    },
  ];

  const skills = [
    "Full-Stack Development",
    "DevOps Practices",
    "System Design",
    "Mentorship",
    "Automation",
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center py-20 px-4"
      id="about"
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="relative mb-16 text-center">
          <h2 className="font-mono text-stone-200 font-bold glowing-text text-3xl md:text-5xl lg:text-7xl">
            About Me
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full" />
        </div>

        {/* Timeline Section */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 mb-12 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-semibold text-white">
              Journey Timeline
            </h3>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative">
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent" />
                )}
                <div className="flex gap-6">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-slate-700/500 flex items-center justify-center ring-2 ring-blue-500/30">
                      <milestone.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-700/300 rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="text-xl font-mono text-blue-400 mb-2">
                      [{milestone.year}]
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/300  rounded-2xl p-8 transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-red-400" />
              <h3 className="text-2xl font-semibold text-white">Passion</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating scalable systems, automating my way to freedom
            </p>
          </div>

          {/* Skills */}
          <div className="bg-slate-800/300  rounded-2xl p-8 transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-semibold text-white">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-slate-700/50 text-gray-300 text-sm
                    border border-blue-500/20 hover:border-blue-500/50 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
