import './style.css';
import * as THREE from 'three';
import { createEnvironment } from './envionment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as TARGETS from './targets.js';
import { Player } from './player.js';

// Tutorial followed for basic setup: https://www.youtube.com/watch?v=Sv8z__KiR5Y

const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let player = new Player(0, 10, scene);
const camera = player.playerCam;
scene.add(player.group);

let targets = [];

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

createEnvironment(scene);

renderer.domElement.onclick = () => {

  document.body.requestPointerLock();

}


//camera.position.z = 5;
//const controls = new OrbitControls( camera, renderer.domElement );

let target1 = new TARGETS.spin100(0, 0, -20);
targets.push(target1);

for (let target of targets) {
    scene.add(target.group);
}

player.setTargets(targets);

function animate() {

  //controls.update();
  player.update();

  for (let target of targets) {
      target.update();
  }

  renderer.render( scene, camera );

}

window.addEventListener( 'resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

});

export function addScore(points) {
    player.score += points;
}