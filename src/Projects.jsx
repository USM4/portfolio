import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
function Projects() {
    const navigate = useNavigate();
    const nextSectionRef = useRef(null)
  
  const handleScrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start"});
    }
  };
  return (
    <>
    <div>
      <div className="w-full h-screen  flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-40 p-40">
            <div
              className="font-mono text-3xl text-stone-200  w-[400px] h-[300px] bg-black border border-blue-700 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center justify-center select-none font-bold text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
            >
              Project 1
            </div>
            <div
              className="font-mono text-3xl text-stone-200 w-[400px] h-[300px] bg-black border border-blue-700 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center justify-center select-none font-bold text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
            >
              Project 2
            </div>
            <div
              className="font-mono text-3xl text-stone-200 w-[400px] h-[300px] bg-black border border-blue-700 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center justify-center select-none font-bold text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
            >
              Project 3
            </div>
            <div
              className="font-mono text-3xl text-stone-200 w-[400px] h-[300px] bg-black border border-blue-700 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center justify-center select-none font-bold text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
            >
              Project 4
            </div>
            <div
              className="font-mono text-3xl text-stone-200 w-[400px] h-[300px] bg-black border border-blue-700 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center justify-center select-none font-bold text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
            >
              Project 5
            </div>
            <div
              className="font-mono text-3xl text-stone-200 w-[400px] h-[300px] bg-black border border-blue-700 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center cursor-pointer transition-all duration-500 flex items-center justify-center select-none font-bold text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
            >
              Project 6
            </div>
            {/* <div className="flex flex-col p-10">
                <button
                  className="w-28 h-28 rounded-full border- flex items-center justify-center m-auto border-2 border-blue-700 hover:border-blue-500 shadow-lg hover:shadow-[0_0_15px_3px_rgba(45,38,202,0.8)] transition-all"
                //   onClick={handleScrollToNextSection}
                >
                  <img src="./wolfbg.png" alt="Icon" className="w-26 h-26" />
                </button>

            </div> */}
          
        </div>
      </div>
    </div>
      {/* <div
        ref={nextSectionRef}
        className="w-full h-screen flex justify-center items-center"
      >
            <div>NEXT SECTION</div>
      </div> */}
      </>
  );
}

export default Projects;
