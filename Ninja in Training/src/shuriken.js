import * as T from 'three';
import * as TARGETS from './targets.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class Shuriken {
    constructor(x=0, y=0, z=0, targets = []) {

        this.group = new T.Group();

        let simpleProjectileGeom = new T.CylinderGeometry(0.1, 0.1, 0.1, 6);
        let simpleProjectileMat = new T.MeshStandardMaterial({ color: 'silver' });
        this.simpleProjectile = new T.Mesh(simpleProjectileGeom, simpleProjectileMat);
        this.simpleProjectile.rotation.x = Math.PI / 2;

        this.group.add(this.simpleProjectile);

        this.group.position.set(x, y, z);

        this.targets = targets;

        this.thrown = false;

        this.lastTime = null;
        this.velocity = null;
    }

    setPosition(x, y, z) {
        this.group.position.set(x, y, z);
    }

    throw(direction) {

        this.velocity = direction.clone().multiplyScalar(20);

        this.thrown = true;
        this.lastTime = Date.now();

    }

    update() {

        if (this.thrown) {

            let delta = Date.now() - this.lastTime;

            this.velocity.y -= 9.81 * (delta / 1000) * 0.7; // gravity effect for arcs

            this.group.position.add(this.velocity.clone().multiplyScalar(delta / 500));

            this.simpleProjectile.rotation.z += 0.5;

            this.lastTime = Date.now();
        }
    }
}