import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// setup studio lighting
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
highIntensityLight.position.set(-5, -5, -5);
scene.add(highIntensityLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// cylinder geometry has open ended feature
const geometry = new THREE.SphereGeometry(1, 100, 100);
const material = new THREE.MeshStandardMaterial( { color: "red", wireframe: false,metalness: 1 } );
// we will genrallly use MeshBasicMaterial but need to know about mesh standard material
//  using pbr physics based rendering material for real world shine and shadow
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 2;

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );

//making the canvas responsive
window.addEventListener('resize', ()=> {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.dampingFactor = 0.01;

function animate() {
  window.requestAnimationFrame(animate);
	
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update();

  renderer.render( scene, camera );
}

animate();
