import './style.css';
import * as THREE from 'three';

let scene, camera, renderer, cloud;

// Setup
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 100;
  camera.position.x = 10;
  camera.position.y = 30;

  renderer.render(scene, camera);

  // Cloud

  const geometry = new THREE.SphereGeometry( 30, 18, 5, 100);
  // const color1 = new THREE.Color("rgb(173, 216, 230)" );

  const texture = new THREE.TextureLoader().load('cloud_texture4.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });

  cloud = new THREE.Mesh(geometry, material);

  scene.add(cloud);

  // Background
  const skyTexture = new THREE.TextureLoader().load('sky.jpg');
  scene.background = skyTexture;

  // axis helper
  // The X axis is red. The Y axis is green. The Z axis is blue.
  const axesHelper = new THREE.AxesHelper( 1000 );
  scene.add( axesHelper );

  // Lights
  // const pointLight = new THREE.PointLight(0xffffff);
  // pointLight.position.set(5, 5, 5);

  // const ambientLight = new THREE.AmbientLight(0xffffff);
  // scene.add(pointLight, ambientLight);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  cloud.rotation.y += 0.05;
  cloud.rotation.z += 0.01;

  renderer.render(scene, camera);
}

// to keep website centered
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();