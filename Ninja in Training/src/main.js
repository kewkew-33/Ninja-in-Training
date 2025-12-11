import './style.css';
import * as THREE from 'three';
import { createEnvironment } from './envionment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Tutorial followed for basic setup: https://www.youtube.com/watch?v=Sv8z__KiR5Y

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

createEnvironment(scene);

camera.position.z = 5;
const controls = new OrbitControls( camera, renderer.domElement );

function animate() {

  controls.update();

  renderer.render( scene, camera );

}

window.addEventListener( 'resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

});