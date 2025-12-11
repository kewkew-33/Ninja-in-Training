import * as T from 'three';
import { Shuriken } from './shuriken.js';

export class Player {
    constructor(x=-10, z = 10 ) {

        this.group = new T.Group();
        this.score = 0;

        let playerCam = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 150);
        playerCam.position.set(0, 5, 0);
        this.playerCam = playerCam;
        this.group.add(this.playerCam);

        this.group.position.set(x, 0, z);

        this.shuriken = new Shuriken();

        addEventListener('keydown', (e) => {

            if (e.key === 'w') {this.group.position.z -= 1;}
            if (e.key === 's') {this.group.position.z += 1;}
            if (e.key === 'a') {this.group.position.x -= 1;}
            if (e.key === 'd') {this.group.position.x += 1;}
        });

        addEventListener('mousemove', (e) => {

            this.playerCam.rotation.y -= e.movementX * 0.005;
            this.playerCam.rotation.x -= e.movementY * 0.005;
            this.playerCam.rotation.order = "YXZ";
        });

    }
}