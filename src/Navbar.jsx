import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isClicked, setIsClicked] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (e, sectionName) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionName);

    if (targetSection) {
      const startPosition = window.pageYOffset;
      const targetPosition =
        targetSection.getBoundingClientRect().top + window.pageYOffset;
      const duration = 1500;
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
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const handleClicked = (index) => {
    setIsClicked(index);
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "links", label: "Links" },
    { id: "about", label: "About" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed w-full text-blue-700 z-50 backdrop-blur-sm">
      {/* Desktop Menu */}
      <div className="hidden lg:block">
        <ul className="p-10 w-full flex flex-row justify-center cursor-pointer space-x-40">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleClicked(index)}
              className={`font-mono text-3xl font-bold glowing-text hover:text-stone-200 hover:scale-105 transition-all ${
                isClicked === index
                  ? "border-b-4 border-blue-700 shadow-blue-700 glow-border"
                  : ""
              }`}
            >
              <button onClick={(e) => handleScrollTo(e, item.id)}>
                <a href={`#${item.id}`}>{item.label}</a>
              </button>
            </li>
          ))}
        </ul>
      </div>


      <div className="lg:hidden">
        <button
          className="menu-button p-4 m-2 text-blue-700 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg">
            <ul className="flex flex-col items-start">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className="w-full"
                  onClick={() => handleClicked(index)}
                >
                  <button
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className={`w-full text-left px-6 py-4 font-mono text-xl font-bold hover:bg-blue-700/20 transition-all ${
                      isClicked === index ? "border-l-4 border-blue-700" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
