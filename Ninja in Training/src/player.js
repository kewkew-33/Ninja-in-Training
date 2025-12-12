import * as T from 'three';
import { Shuriken } from './shuriken.js';
import { add } from 'three/tsl';

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

        this.moves = {w: false, a: false, s: false, d: false};

        addEventListener('keydown', (e) => {

            if (e.key === 'w') {this.moves.w = true;}
            if (e.key === 's') {this.moves.s = true;}
            if (e.key === 'a') {this.moves.a = true;}
            if (e.key === 'd') {this.moves.d = true ;}
        });

        addEventListener('keyup', (e) => {
            if (e.key === 'w') {this.moves.w = false;}
            if (e.key === 's') {this.moves.s = false;}
            if (e.key === 'a') {this.moves.a = false;}
            if (e.key === 'd') {this.moves.d = false ;}
        });

        // Rotate camera based on mouse direction
        addEventListener('mousemove', (e) => {

            this.playerCam.rotation.x -= e.movementY * 0.005;
            this.group.rotation.y -= e.movementX * 0.005;
            this.playerCam.rotation.order = "YXZ";
        });

    }

    update() {

        console.log(this.group.getWorldDirection(new T.Vector3()));

        const speed = 0.5;

        const direction = this.group.getWorldDirection(new T.Vector3());
        const right = new T.Vector3().crossVectors(direction, new T.Vector3(0, 1, 0));

        if (this.moves.w) {
            this.group.position.addScaledVector(direction, -speed);
        }
        if (this.moves.s) {
            this.group.position.addScaledVector(direction, speed);
        }
        if (this.moves.a) {
            this.group.position.addScaledVector(right, speed);
        }
        if (this.moves.d) {
            this.group.position.addScaledVector(right, -speed);
        }

    }

}