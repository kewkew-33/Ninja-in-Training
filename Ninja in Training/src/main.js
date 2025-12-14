import './style.css';
import * as THREE from 'three';
import { createEnvironment, createTargets } from './envionment';
import * as TARGETS from './targets.js';
import { Player } from './player.js';

// Tutorial followed for basic setup: https://www.youtube.com/watch?v=Sv8z__KiR5Y

const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let player = new Player(0, 10, scene);
const camera = player.playerCam;
scene.add(player.group);

let targets = createTargets();

let time = 60;
let startTime = Date.now();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

document.getElementById("hit-left").style.visibility = "hidden";
document.getElementById("hit-right").style.visibility = "hidden";
document.getElementById("hit-up").style.visibility = "hidden";
document.getElementById("hit-down").style.visibility = "hidden";

createEnvironment(scene);

renderer.domElement.onclick = () => {

  document.body.requestPointerLock();

}

for (let target of targets) {
    scene.add(target.group);
}

player.setTargets(targets);

function animate() {

  time = 60 - Math.floor((Date.now() - startTime) / 1000);

  if (time <= 0) {

    if ( localStorage.getItem("ninjaHighScore") === null || player.score > localStorage.getItem("ninjaHighScore")) {
        localStorage.setItem("ninjaHighScore", player.score);
    }

      renderer.setAnimationLoop( null );
      window.location.href = "index.html";
  }

  document.getElementById("timer").innerText = "Time: " + time;

  document.getElementById("score-counter").innerText = "Score: " + player.score;

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

export function hitMark() {
  
  document.getElementById("hit-left").style.visibility = "visible";
  document.getElementById("hit-right").style.visibility = "visible";
  document.getElementById("hit-up").style.visibility = "visible";
  document.getElementById("hit-down").style.visibility = "visible";

  setTimeout(() => {
    document.getElementById("hit-left").style.visibility = "hidden";
    document.getElementById("hit-right").style.visibility = "hidden";
    document.getElementById("hit-up").style.visibility = "hidden";
    document.getElementById("hit-down").style.visibility = "hidden";
  }, 100);

}