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

        this.speed = 1;

        this.targets = targets;

        this.curve = null;

        this.throwTime = null;
        this.t = 0;
    }

    setPosition(x, y, z) {
        this.group.position.set(x, y, z);
    }

    throw(targetX, targetY, targetZ) {

        let curr = this.group.getWorldPosition(new T.Vector3());

        targetZ = 50;
        targetY = targetY - 10;

        let dx = targetX - curr.x;
        let dy = targetY - curr.y;
        let dz = targetZ - curr.z;

        let controlX = curr.x + dx / 2;
        let controlY = curr.y;
        let controlZ = 30;

        this.curve = new T.QuadraticBezierCurve3(
            curr,
            new T.Vector3(controlX, controlY, controlZ),
            new T.Vector3(targetX, targetY, targetZ)
        )

        this.throwTime = Date.now();

    }

    update() {

        if (this.curve) {

            this.t = (Date.now() - this.throwTime) / 1000 * this.speed;

            if (this.t > 1) {
                this.t = 1;
            }

            this.simpleProjectile.position.copy(this.curve.getPoint(this.t));

            this.simpleProjectile.rotation.z += 0.5;
        }
    }
}