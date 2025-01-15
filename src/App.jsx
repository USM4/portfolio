import React, {  } from 'react';
import * as THREE from 'three';
import "./App.css";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ReactTypingEffect from 'react-typing-effect';
// import { Wireframe } from 'three/examples/jsm/Addons.js';
// import { cos } from 'three/examples/jsm/nodes/Nodes.js';
// import { color } from 'dat.gui';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarryBackground from './StarryBackground.jsx'
import Navbar from './Navbar.jsx'


function App() {

  return (

    <Router>
      <StarryBackground />
      <Routes>
        <Route path='/' element={<Navbar/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;