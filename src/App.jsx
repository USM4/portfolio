import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import ReactTypingEffect from 'react-typing-effect';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main-div">
        <ul className="navbar">
          <li>BSISI</li>
          <li>Projects</li>
          <li>Lifestyle</li>
          <li>Cv</li>
          <img src="instagram.png" style={{ width: "30px", height: "30px" }} alt="Instagram" />
          <img src="github.svg" style={{ width: "30px", height: "30px" }} alt="GitHub" />
        </ul>
      </div>
      <div className="App">
        <h1 className="body-text">
          <ReactTypingEffect
            text={['HI MY NAME IS OUSSAMA :/', 'Welcome to my portfolio!']}
            speed={70}
            eraseDelay={90}
            typingDelay={110}
          />
        </h1>
      </div>
    </>
  );
}

export default App;
