const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
scene.add(camera);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "blue" } );
const cube = new THREE.Mesh( geometry, material );

// cube.scale.x = 2.5;
// cube.rotation.y = Math.PI / 4
scene.add( cube );

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

let clock = new THREE.clock();
function animate() {
    //run fuunction for full fps of your pc
    window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
    cube.rotation.x = clock.getElapsedTime() * 2;
    cube.rotation.y = clock.getElapsedTime() * 2;
}
animate();
