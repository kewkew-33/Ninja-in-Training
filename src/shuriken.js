import * as T from '../node_modules/three';
import * as TARGETS from './targets.js';
import { FBXLoader } from '../node_modules/three/addons/loaders/FBXLoader.js';

export class Shuriken {
    constructor(x=0, y=0, z=0, targets = [], scene) {

        this.group = new T.Group();

        let simpleProjectileGeom = new T.CylinderGeometry(0.1, 0.1, 0.05, 6);
        let simpleProjectileMat = new T.MeshStandardMaterial({ color: 'silver' });

        this.projectile = new T.Mesh(simpleProjectileGeom, simpleProjectileMat);

        if(localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new FBXLoader();

            loader.loadAsync('../public/models/Shuriken_1.fbx').then((object) => {

                this.group.remove(this.projectile);
                object.scale.set(0.1, 0.1, 0.1);
                this.projectile = object;
                this.projectile.rotation.y = Math.PI / 2;
                this.group.add(this.projectile);
            });
        }

        this.projectile.rotation.z = Math.PI / 2;

        this.group.add(this.projectile);

        this.group.position.set(x, y, z);

        this.targets = targets;

        this.thrown = false;

        this.lastTime = null;
        this.velocity = null;
        this.scene = scene;
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

        if(this.group.position.y < 0 || this.group.position.x > 50 || this.group.position.x < -50 || this.group.position.z > 50 || this.group.position.z < -50) {
            this.scene.remove(this.group);
        }

        if (this.thrown) {

            let delta = Date.now() - this.lastTime;

            this.velocity.y -= 9.81 * (delta / 1000) * 0.7; // gravity effect for arcs

            this.group.position.add(this.velocity.clone().multiplyScalar(delta / 300));

            this.projectile.rotation.z += 0.5;

            this.lastTime = Date.now();
        }

        for (let target of this.targets) {
            if (target.checkIntersection(this) != 0) {

                target.hit(target.checkIntersection(this));
                this.scene.remove(this.group);
                break;
            }
        }
    }
}
