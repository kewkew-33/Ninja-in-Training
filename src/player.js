import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { Shuriken } from './shuriken.js';

export class Player {
    constructor(x=0, z = 10, scene, model=null ) {

        this.group = new T.Group();
        this.score = 0;

        let playerCam = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 150);
        playerCam.position.set(0, 5, 0);
        this.playerCam = playerCam;
        this.group.add(this.playerCam);

        this.group.position.set(x, 0, z);

        this.model = model;

        this.shuriken = new Shuriken(0.2, 4.7, -0.5);
        this.group.add(this.shuriken.group);

        this.moves = {w: false, a: false, s: false, d: false};

        this.shurikenList = [];

        this.targets = [];

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

            if (this.playerCam.rotation.x < -Math.PI / 2) {
                this.playerCam.rotation.x = -Math.PI / 2;
            }
            if (this.playerCam.rotation.x > Math.PI / 2) {
                this.playerCam.rotation.x = Math.PI / 2;
            }
        });

        addEventListener('click', () => {
            let throwingShuriken = new Shuriken(0.2, 4.7, -0.5, this.targets, scene);
            throwingShuriken.group.position.copy(this.shuriken.group.getWorldPosition(new T.Vector3()));

            let direction = new T.Vector3();

            this.playerCam.getWorldDirection(direction);
            throwingShuriken.throw(direction);

            this.shurikenList.push(throwingShuriken);
            scene.add(throwingShuriken.group);
        });

    }

    setTargets(targets) {
        this.targets = targets;
    }

    update() {

        const speed = 0.25;

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

        if (this.group.position.x > 49) {
            this.group.position.x = 49;
        }
        if (this.group.position.x < -49) {
            this.group.position.x = -49;
        }
        if (this.group.position.z < 1) {
            this.group.position.z = 1;
        }
        if (this.group.position.z > 49) {
            this.group.position.z = 49;
        }

        for (let shuriken of this.shurikenList) {
            shuriken.update();
        }
    }
}
