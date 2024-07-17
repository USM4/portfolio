import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "./App.css";
import ReactTypingEffect from 'react-typing-effect';
import { Wireframe } from 'three/examples/jsm/Addons.js';

function App() {
  useEffect(() => {
    const render = new THREE.WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(render.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const controls = new OrbitControls(camera, render.domElement);
    controls.update();
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    camera.position.set(-10,30,30);
    const BoxGeometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(BoxGeometry, material);
  
    scene.add(cube);
    
    const planeGeometry = new THREE.PlaneGeometry(30,30);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);

    const gridHelper = new THREE.GridHelper(30);
    scene.add(gridHelper);

    const sphereGeometry = new THREE.SphereGeometry(4,50,50);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF , wireframe: true});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    scene.add(sphere);

    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      render.render(scene, camera); 
    }
    render.setAnimationLoop(animate);
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
    </>
  );
}

export default App;