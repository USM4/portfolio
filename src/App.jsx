import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarryBackground from './StarryBackground.jsx';
import Navbar from './Navbar.jsx';
import Projects from './Projects.jsx';
import Links from './Links.jsx';
import About from './About.jsx';
import Home from './Home.jsx';

function App() {

  return (
    <Router>
      <StarryBackground />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={<><Navbar/><Projects/></>} />
        <Route path='/links' element={<><Navbar/><Links/></>} />
        <Route path='/about' element={<><Navbar/><About/></>} />

      </Routes>
    </Router>
  );
}

export default App;
