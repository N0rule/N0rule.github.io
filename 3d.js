// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const canvas = document.getElementById('model-viewer');

// // Create a Three.js renderer and set its size to match the canvas
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Create a Three.js scene
// const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5))
// // Create a Three.js camera and set its position
// var camera = new THREE.PerspectiveCamera(70, 
//   window.innerWidth/window.innerHeight, 0.1, 1000 ); // Specify camera type like this
//   camera.position.set(0,2.5,2.5); // Set position like this
//   camera.lookAt(25000,10,10);
// // Create a light for the scene
// const light = new THREE.SpotLight(0xffffff, 2);
// light.position.set(0, 0, 5);

// scene.add(light);
// scene.background = new THREE.Color("#404258"); 
// // Create a GLTFLoader
// const loader = new GLTFLoader();

// // Load the GLTF 3D model
// loader.load(
//   'models/whitebun.gltf',
//   (gltf) => {
//     // Add the model to the scene
//     scene.add(gltf.scene);
//   },
//   undefined,
//   (error) => {
//     console.error(error);
//   }
// );

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//   renderer.setSize(window.innerWidth/window.innerHeight, 0.1, 1000);
// }
// // Render the scene
// renderer.render(scene, camera);

// const controls = new OrbitControls( camera, renderer.domElement );
// // Animation loop
// function animate() {
// renderer.render(scene, camera);
// scene.rotation.y += 0.02;
// controls.update();
// requestAnimationFrame(animate);
// }
// animate();