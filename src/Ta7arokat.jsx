import React from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { Wireframe } from 'three/examples/jsm/Addons.js';
import { cos } from 'three/examples/jsm/nodes/Nodes.js';

const Ta7arokat = () => {

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
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);
        
        camera.position.set(-10,7,45);
        controls.update();
    
        // const BoxGeometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(BoxGeometry, material);
      
        // scene.add(cube);
        
        // const planeGeometry = new THREE.PlaneGeometry(30,30);
        // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide});
        // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.rotation.x = -0.5 * Math.PI;
        
        // scene.add(plane);
    
        // const gridHelper = new THREE.GridHelper(30);
        // scene.add(gridHelper);
    
        render.setClearColor(0x0);
        const textureLoader = new THREE.TextureLoader();
        const moonTexture = textureLoader.load('/neptune.jpeg');
        const sphereGeometry = new THREE.SphereGeometry(4,50,50);
        const sphereMaterial = new THREE.MeshBasicMaterial({  map: moonTexture});
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(8,8,8);
        scene.add(sphere);
    
        let step = 0;
        let speed = 0.02;
        
        function animate() {
          // cube.rotation.x += 0.01;
          // cube.rotation.y += 0.01;
          // step += speed;
          sphere.material.color.set(0x2D26CA);
          // sphere.position.y = 10 * Math.abs(Math.sin(step));
          // sphere.rotation.x += 0.01;
          sphere.rotation.y += 0.001;
          render.render(scene, camera);
        }
        console.log(sphere.position);
        render.setAnimationLoop(animate);
      }, []);
}
