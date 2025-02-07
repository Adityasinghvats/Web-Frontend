import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as lil from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// setup studio lighting
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
highIntensityLight.position.set(-5, -5, -5);
scene.add(highIntensityLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);
// const helper3 = new THREE.DirectionalLightHelper( directionalLight, 2 );
// scene.add( helper3 );

const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2);
pointLight.position.set(1,-1,1);
scene.add(pointLight);
const helper4 = new THREE.PointLightHelper( pointLight, 1 );
scene.add( helper4 );


let loader = new THREE.TextureLoader();
let color = loader.load('./assets/paper_0025_color_1k.jpg');
let roughness = loader.load('/assets/paper_0025_roughness_1k.jpg');
let normal = loader.load('/assets/paper_0025_normal_opengl_1k.png');
let height = loader.load('/assets/paper_0025_height_1k.png');

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// cylinder geometry has open ended feature
const geometry = new THREE.SphereGeometry(1, 100, 100);
const material = new THREE.MeshStandardMaterial( { 
  map: color, roughnessMap: roughness , 
  normalMap:normal,
} );
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

const gui = new lil.GUI();

const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.close();

const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1);
materialFolder.add(material, 'metalness', 0, 1);
materialFolder.open();

const lightFolder = gui.addFolder('Lights');

const highIntensityLightFolder = lightFolder.addFolder('High Intensity Light');
highIntensityLightFolder.add(highIntensityLight.position, 'x', -10, 10);
highIntensityLightFolder.add(highIntensityLight.position, 'y', -10, 10);
highIntensityLightFolder.add(highIntensityLight.position, 'z', -10, 10);
highIntensityLightFolder.add(highIntensityLight, 'intensity', 0, 10);
highIntensityLightFolder.open();

const ambientLightFolder = lightFolder.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 1);
ambientLightFolder.open();

const directionalLightFolder = lightFolder.addFolder('Directional Light');
directionalLightFolder.add(directionalLight.position, 'x', -10, 10);
directionalLightFolder.add(directionalLight.position, 'y', -10, 10);
directionalLightFolder.add(directionalLight.position, 'z', -10, 10);
directionalLightFolder.add(directionalLight, 'intensity', 0, 10);
directionalLightFolder.open();

const pointLightFolder = lightFolder.addFolder('Point Light');
pointLightFolder.add(pointLight.position, 'x', -10, 10);
pointLightFolder.add(pointLight.position, 'y', -10, 10);
pointLightFolder.add(pointLight.position, 'z', -10, 10);
pointLightFolder.add(pointLight, 'intensity', 0, 10);
pointLightFolder.open();

lightFolder.open();

//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.dampingFactor = 0.01;

function animate() {
  window.requestAnimationFrame(animate);
	
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();

  renderer.render( scene, camera );
}

animate();
