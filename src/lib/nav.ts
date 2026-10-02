/** Primary navigation + which page sections light up each item (scroll-spy). */
export const navItems = [
  { id: "pipeline", label: "Pipeline", sections: ["pipeline", "principles"] },
  { id: "work", label: "Work", sections: ["work"] },
  { id: "code", label: "Code", sections: ["code"] },
  { id: "engage", label: "Engage", sections: ["engage", "testimonials"] },
  { id: "console", label: "Console", sections: ["console"] },
  { id: "about", label: "About", sections: ["about", "contact"] },
] as const;

/** Bridge so the command menu can run terminal commands. */
export const runTerminal = (cmd: string) => window.dispatchEvent(new CustomEvent("usm4:terminal", { detail: cmd }));
