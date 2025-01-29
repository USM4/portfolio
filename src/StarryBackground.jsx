import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './App.css'

const StarryBackground = () => {
      const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
      }, []);
    
      return (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                
                value: "#000",
              },
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "repulse",
                },
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
              modes: {
                push: {
                  distance: 10,
                  duration: 0.4,  
                },
                grab: {
                  distance: 150,
                },
              },
            },
            particles: {
              number: {
                value: 15,
                density: {
                  enable: true,
                  value_area: 300,
                },
              },
              color: {
                value: "#2D26CA",
              },
              links: {
                enable: true,
                color: "#2D26CA",
                distance: 150,
              },
              move: {
                enable: true,
                speed: 1,
              },
            },
          }}
        />
      );
    };
    
    export default StarryBackground;