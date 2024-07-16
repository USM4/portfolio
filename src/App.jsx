import React, { useRef, useEffect, useState } from 'react';
import reactLogo from "./assets/react.svg";
import "./App.css";
import ReactTypingEffect from 'react-typing-effect';
import * as THREE from 'three';


function App() {
  const [count, setCount] = useState(0);
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

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
      <div ref={mountRef} />
    </>
  );
}

export default App;
