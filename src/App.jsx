import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarryBackground from './StarryBackground.jsx';
import Navbar from './Navbar.jsx';
import Projects from './Projects.jsx';

function App() {

  return (
    <Router>
      <StarryBackground />
      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/projects' element={<><Navbar/><Projects/></>} />
      </Routes>
    </Router>
  );
}

export default App;
