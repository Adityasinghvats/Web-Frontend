import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { gsap } from 'gsap/gsap-core';

const canvas = document.querySelector('#canvas')

// Add these variables at the top of your file after imports
const mousePosition = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
};

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/rogland_clear_night_4k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
});

// Load GLTF Model
const loader = new GLTFLoader();
let model;

loader.load(
    './DamagedHelmet.gltf', // Replace with your model path
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
    },undefined,
    function (error) {
        console.error('An error occurred loading the model:', error);
    }
);


// Setup post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Add RGB Shift effect
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0030; // Adjust this value to control the effect strength
composer.addPass(rgbShiftPass);

// Replace your existing animate function with this:
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth mouse movement
    if (model) {
        mousePosition.x += (mousePosition.targetX - mousePosition.x) * 0.05;
        mousePosition.y += (mousePosition.targetY - mousePosition.y) * 0.05;
        
        gsap.to(model.rotation, {
            x: mousePosition.y,
            y: mousePosition.x,
            duration: 0.8,
            ease: "power1.out",
            overwrite: true
        });
    }
    
    composer.render();
}

// Start the animation loop
animate();

// Replace your mousemove event listener with this:
window.addEventListener('mousemove', (e) => {
    if (model) {
        mousePosition.targetX = ((e.clientX / window.innerWidth) - 0.5) * Math.PI * 0.3;
        mousePosition.targetY = ((e.clientY / window.innerHeight) - 0.5) * Math.PI * 0.15;
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
