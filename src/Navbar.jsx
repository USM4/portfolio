import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "links", label: "Links" },
    { id: "about", label: "About" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((item) => item.element);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = section.element;
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function: easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
    setMobileMenuOpen(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -10 },
    open: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? " backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Desktop Menu */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <ul className="p-6 flex justify-center items-center space-x-16">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={(e) => handleScrollTo(e, item.id)}
                className="relative group"
              >
                <span
                  className={`font-mono text-lg font-semibold transition-colors duration-300
                  ${
                    activeSection === item.id
                      ? "text-blue-700"
                      : "text-gray-400 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-2 left-0 w-full h-0.5 transform transition-all duration-300
                  ${
                    activeSection === item.id
                      ? "bg-blue-700 scale-x-100"
                      : "bg-blue-700/50 scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center p-4">
          <motion.button
            className="p-2 rounded-lg bg-slate-800/50 text-blue-700 hover:bg-slate-700/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg border-t border-blue-700/20"
            >
              <ul className="py-2">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.id}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <button
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className={`w-full px-6 py-4 text-left font-mono text-lg font-semibold
                        transition-all duration-300 hover:bg-blue-700/10
                        ${
                          activeSection === item.id
                            ? "text-blue-700 bg-blue-700/5"
                            : "text-gray-400"
                        }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
