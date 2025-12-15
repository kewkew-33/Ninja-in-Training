import * as T from '../node_module/three';
import { addScore } from './main.js';
import { hitMark } from './main.js';
import { FBXLoader } from '../node_modules/three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/Addons.js';

export class spin200 {
    constructor(x=0, y=0, z=0, orientation) {

        this.group = new T.Group();

        const geometry = new T.CylinderGeometry(3,3,1,32);
        geometry.rotateX(Math.PI / 2);
        const material = new T.MeshBasicMaterial({ color: 'red' });

        let ring1 = new T.Mesh(geometry, material);
        let ring2 = new T.Mesh(geometry, material);

        if (localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new GLTFLoader();

            loader.loadAsync('../public/models/Tomato.glb').then((gltf) => {

                this.group.remove(ring1);
                this.group.remove(ring2);

                ring1 = gltf.scene;
                ring1.scale.set(0.5, 0.5, 0.5);
                ring1.rotation.x = Math.PI / 2;
                ring1.position.set(0, 5, -1);
                this.ring1 = ring1;
                this.group.add(ring1);

                ring2 = gltf.scene.clone();
                ring2.scale.set(0.5, 0.5, 0.5);
                ring2.rotation.x = Math.PI / 2;
                ring2.position.set(0, -5, -1);
                this.group.add(ring2);
                this.ring2 = ring2;

            });
        }

        ring1.position.set(0, 5, 0);
        ring2.position.set(0, -5, 0);

        this.group.add(ring1);
        this.group.add(ring2);

        this.ring1 = ring1;
        this.ring2 = ring2;
        this.group.position.set(x, y, z);

        this.speed = 0.005;

        this.value = 200;

        this.hit1 = false;
        this.hit2 = false;

        this.orientation = orientation;

    }

    checkIntersection(shuriken) {

        let inside1 = true;
        let inside2 = true;

        let ring1Pos = this.ring1.getWorldPosition(new T.Vector3());
        let ring2Pos = this.ring2.getWorldPosition(new T.Vector3());

        if (!(shuriken.group.position.x < ring1Pos.x + 0.7 &&
             shuriken.group.position.x > ring1Pos.x - 0.7)) {
            inside1 = false;
        }

        let distanceY = shuriken.group.position.y - ring1Pos.y;
        let distanceZ = shuriken.group.position.z - ring1Pos.z;

        let distance = Math.sqrt(distanceY * distanceY + distanceZ * distanceZ);

        if (!(distance < 3.5)) {
            inside1 = false;
        }

        if (!(shuriken.group.position.x < ring2Pos.x + 0.7 &&
             shuriken.group.position.x > ring2Pos.x - 0.7)) {
            inside2 = false;
        }

        let distanceY2 = shuriken.group.position.y - ring2Pos.y;
        let distanceZ2 = shuriken.group.position.z - ring2Pos.z;

        let distance2 = Math.sqrt(distanceY2 * distanceY2 + distanceZ2 * distanceZ2);

        if (!(distance2 < 3.5)) {
            inside2 = false;
        }

        if( inside1 && this.hit1 === false) {
            return 1;
        }

        if( inside2 && this.hit2 === false) {
            return 2;
        }

        return 0;

    }

    hit(t) {

        addScore(this.value);
        hitMark();

        if (t === 1) {
            this.ring1.visible = false;
            this.hit1 = true;
        } else if (t === 2) {
            this.ring2.visible = false;
            this.hit2 = true;
        }

    }

    update() {

        this.group.rotation.z += this.speed;
        if (this.hit1) {
            if ((this.ring1.getWorldPosition(new T.Vector3()).y < -3 && this.orientation === 2) ||
                (this.ring1.getWorldPosition(new T.Vector3()).x < -53 && this.orientation === 1) || 
                (this.ring1.getWorldPosition(new T.Vector3()).x > 53 && this.orientation === 3)) {
                this.hit1 = false;
                this.ring1.visible = true;
            }
        }
        if (this.hit2) {
            if ((this.ring2.getWorldPosition(new T.Vector3()).y < -3 && this.orientation === 2) ||
                (this.ring2.getWorldPosition(new T.Vector3()).x < -53 && this.orientation === 1) || 
                (this.ring2.getWorldPosition(new T.Vector3()).x > 53 && this.orientation === 3)) {
                this.hit2 = false;
                this.ring2.visible = true;
            }
        }
    }
}

export class Cube500 {

    constructor(x=0, y=0, z=0) {

        this.group = new T.Group();

        const geometry = new T.BoxGeometry(4,4,4);
        const material = new T.MeshBasicMaterial({ color: 'blue' });
        let cube;
        cube = new T.Mesh(geometry, material);

        if (localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new GLTFLoader();

            loader.loadAsync('../public/models/Pumpkin.glb').then((gltf) => {

                this.group.remove(cube);
                cube = gltf.scene;
                cube.scale.set(3, 3, 3);
                cube.position.y += 0.5;
                this.group.add(cube);

            });
        }

        this.group.add(cube);
        this.group.position.set(x, y, z);

        this.value = 500;

        this.collected = false;

    }

    checkIntersection(shuriken) {

        let cubePos = this.group.getWorldPosition(new T.Vector3());

        if (shuriken.group.position.x < cubePos.x + 2 &&
            shuriken.group.position.x > cubePos.x - 2 &&
            shuriken.group.position.y < cubePos.y + 2 &&
            shuriken.group.position.y > cubePos.y - 2 &&
            shuriken.group.position.z < cubePos.z + 2 &&
            shuriken.group.position.z > cubePos.z - 2) {return 1;}
        return 0;

    }

    hit( val ) {

        if( !this.collected) {

            hitMark();

            addScore(this.value);
            this.collected = true;
            this.group.visible = false;

        }

    }

    update() {

        this.group.position.y -= 0.05;

        if (this.group.position.y < -5) {
            this.group.position.y = 54;
            this.collected = false;
            this.group.visible = true;
        }
    }
}

export class Dodec4000 {

    constructor(x=0, y=0, z=0) {

        this.group = new T.Group();

        const geometry = new T.DodecahedronGeometry(1);
        const material = new T.MeshBasicMaterial({ color: 'green' });
        const tetra = new T.Mesh(geometry, material);

        if (localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new GLTFLoader();

            loader.loadAsync('../public/models/Beet.glb').then((gltf) => {

                this.group.remove(tetra);
                let beet = gltf.scene;
                this.group.add(beet);

            });

        }

        this.group.add(tetra);

        this.group.position.set(x, y, z);

        this.value = 4000;

        this.collected = false;

        this.previousStage = 0;

        this.stage = 1;

        this.pauseTime = Date.now();
    }

    checkIntersection(shuriken) {

        let tetraPos = this.group.getWorldPosition(new T.Vector3());

        if (shuriken.group.position.x < tetraPos.x + 0.5 &&
            shuriken.group.position.x > tetraPos.x - 0.5 &&
            shuriken.group.position.y < tetraPos.y + 0.5 &&
            shuriken.group.position.y > tetraPos.y - 0.5 &&
            shuriken.group.position.z < tetraPos.z + 0.5 &&
            shuriken.group.position.z > tetraPos.z - 0.5) {return 1;}

        return 0;

    }

    hit( val ) {
        if( !this.collected) {
            hitMark();
            addScore(this.value);
            this.collected = true;
            this.group.visible = false;
        }
    }

    update() {

        this.group.rotation.y += 0.01;

        if(this.stage === 1) {

            if(Date.now() - this.pauseTime > 7000) {

                if(this.previousStage === 0) {

                    this.stage = 2;

                }

                if(this.previousStage === 2) {
                    this.stage = 0;
                }

                this.previousStage = 1;
            }
        }
        else if(this.stage === 2) {

            this.group.position.y -= 0.1;

            if(this.group.position.y < -2.5) {

                this.stage = 1;
                this.previousStage = 2;
                this.pauseTime = Date.now();
                this.collected = false;
                this.group.visible = true;

            }
        }
        else if(this.stage === 0) {

            this.group.position.y += 0.1;
            if(this.group.position.y > 1.5) {
                this.stage = 1;
                this.previousStage = 0;
                this.pauseTime = Date.now();
            }
        }
    }
}

export class Sphere800 {

    constructor(x=0, y=0, z=0, stage) {

        this.group = new T.Group();

        const geometry = new T.SphereGeometry(2, 32, 32);
        const material = new T.MeshBasicMaterial({ color: 'yellow' });
        const sphere = new T.Mesh(geometry, material);

        if (localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new GLTFLoader();

            loader.loadAsync('../public/models/Cauliflower.glb').then((gltf) => {

                this.group.remove(sphere);
                let cauliflower = gltf.scene;
                cauliflower.scale.set(12, 12, 12);
                cauliflower.position.z -= 1.5;
                cauliflower.rotation.x = Math.PI / 2;
                this.group.add(cauliflower);

            });

        }

        this.group.add(sphere);

        this.group.position.set(x, y, z);

        this.value = 800;

        this.collected = false;

        this.stage = stage;

        this.previousStage = 0;

        this.pauseTime = Date.now();

    }

    checkIntersection(shuriken) {

        let spherePos = this.group.getWorldPosition(new T.Vector3());

        let distance = shuriken.group.position.distanceTo(spherePos);

        if (distance < 2.5) {return 1;}

        return 0;

    }

    hit( val ) {

        if( !this.collected) {
            hitMark();
            addScore(this.value);
            this.collected = true;
            this.group.visible = false;
        }
    }

    update() {

        if (this.stage === 0) {

            this.group.position.x += 0.15;
            if (this.group.position.x > 53) {
                this.stage = 1;
                this.previousStage = 0;
            }

        }
        else if (this.stage === 1) {

            if(Date.now() - this.pauseTime > 3000) {

                if(this.previousStage === 0) {

                    this.stage = 2;

                }
                else if (this.previousStage === 2) {

                    this.stage = 0;

                }

                this.previousStage = 1;

            }
        }
        else if (this.stage === 2) {

            this.group.position.x -= 0.15;
            if (this.group.position.x < -53) {
                this.stage = 1;
                this.previousStage = 2;
                this.pauseTime = Date.now();
            }
        }
    }
}

export class TorusKnot15000 {

    constructor() {

        this.group = new T.Group();

        const geometry = new T.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new T.MeshBasicMaterial({ color: 'purple' });
        const torusKnot = new T.Mesh(geometry, material);

        if (localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new FBXLoader();

            loader.loadAsync('../public/models/not mushroom.fbx').then((object) => {

                this.group.remove(torusKnot);
                object.scale.set(0.05, 0.05, 0.05);
                object.rotation.x = Math.PI;
                object.position.y += 1.5;
                this.group.add(object);

            });
        }

        this.group.add(torusKnot);

        this.value = 15000;

        this.collected = false;

        this.pauseTime = Date.now();
        this.visibleTime = null;

        this.stage = 1;

    }

    checkIntersection(shuriken) {

        let torusKnotPos = this.group.getWorldPosition(new T.Vector3());

        let distance = shuriken.group.position.distanceTo(torusKnotPos);

        if (distance < 1.25) {return 1;}

        return 0;

    }

    hit( val ) {

        if( !this.collected) {
            hitMark();
            addScore(this.value);
            this.collected = true;
            this.group.visible = false;
        }

    }

    update() {

        if(this.stage === 1) {

            if (this.visibleTime != null) {

                if(Date.now() - this.visibleTime > 4000) {

                    this.stage = 2;
                    this.visibleTime = null;

                }
            }

            else if(Date.now() - this.pauseTime > 10000) {

                if(Math.random() < 0.95) {

                    let x = Math.random() * 100 - 50;
                    let z = Math.random() * 50 - 50;
                    let y = 52;

                    this.group.position.set(x, y, z);

                    this.collected = false;
                    this.group.visible = true;

                    this.stage = 0;

                    this.visibleTime = Date.now();

                }

                this.pauseTime = Date.now();

            }
        }
        else if(this.stage === 0) {

            this.group.position.y -= 0.2;

            if(this.group.position.y < 47) {

                this.stage = 1;
                this.visibleTime = Date.now();

            }

        }

        else if(this.stage === 2) {

            this.group.position.y += 0.2;

            if(this.group.position.y > 52) {

                this.stage = 1;
                this.pauseTime = Date.now();

            }
        }
    }
}

export class Capsule1000 {

    constructor() {

        this.group = new T.Group();

        const geometry = new T.CapsuleGeometry(1, 2, 4, 8);
        const material = new T.MeshBasicMaterial({ color: 'orange' });
        const capsule = new T.Mesh(geometry, material);

        if (localStorage.getItem("ninjaPrototypeMode") === "false") {

            let loader = new GLTFLoader();

            loader.loadAsync('../public/models/Corn.glb').then((gltf) => {

                this.group.remove(capsule);
                let corn = gltf.scene;
                corn.scale.set(0.125, 0.125, 0.125);
                corn.position.y -= 3;
                this.group.add(corn);

            });

        }

        this.group.add(capsule);

        this.value = 1000;

        this.group.position.set(110, 0, 0); // Start off-screen

        this.collected = false;

        this.pauseTime = Date.now();
        this.stage = 1;
        this.t = 0;

    }

    checkIntersection(shuriken) {

        let capsulePos = this.group.getWorldPosition(new T.Vector3());

        let distance = shuriken.group.position.distanceTo(capsulePos);

        if (distance < 2) {return 1;}

        return 0;

    }

    hit( val ) {
        if( !this.collected) {
            hitMark();
            addScore(this.value);
            this.collected = true;
            this.group.visible = false;
        }
    }

    update() {

        if(this.stage === 1) {

            if(Date.now() - this.pauseTime > 2000) {
             
                if(Math.random() < 0.3) {

                    let x = Math.random() * 100 - 50;
                    let z = Math.random() * 50 - 50;
                    let y = -2;

                    this.group.position.set(x, y, z);

                    this.collected = false;
                    this.group.visible = true;

                    this.stage = 2;

                }

                else {

                    this.pauseTime = Date.now();

                }
            }
        }
        else if(this.stage === 2) {

            this.t += 0.025;
            this.group.rotation.x -= 0.1;

            this.group.position.y = -1.08 * (this.t - 5) * (this.t - 5) + 30;

            if(this.group.position.y < -3) {

                this.stage = 1;
                this.pauseTime = Date.now();
                this.t = 0;

            }
        }
    }
}
