import * as T from 'three';
import { addScore } from './main.js';

export class spin100 {
    constructor(x=0, y=0, z=0, orientation) {

        this.group = new T.Group();

        const geometry = new T.CylinderGeometry(3,3,1,32);
        geometry.rotateX(Math.PI / 2);
        const material = new T.MeshBasicMaterial({ color: 'red' });

        const ring1 = new T.Mesh(geometry, material);
        const ring2 = new T.Mesh(geometry, material);

        ring1.position.set(0, 5, 0);
        ring2.position.set(0, -5, 0);

        this.group.add(ring1);
        this.group.add(ring2);

        this.ring1 = ring1;
        this.ring2 = ring2;
        this.group.position.set(x, y, z);

        this.speed = 0.005;

        this.value = 100;

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

        if( inside1) {
            return 1;
        }

        if( inside2) {
            return 2;
        }

        return 0;

    }

    hit(t) {

        addScore(this.value);

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