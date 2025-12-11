import * as T from 'three';

export class spin100 {
    constructor(x=0, y=0, z=0) {

        this.group = new T.Group();

        const geometry = new T.RingGeometry(0, 3, 32);
        const material = new T.MeshBasicMaterial({ color: 'red' });

        const ring1 = new T.Mesh(geometry, material);
        const ring2 = new T.Mesh(geometry, material);

        ring1.position.set(0, 5, 0);
        ring2.position.set(0, -5, 0);

        this.group.add(ring1);
        this.group.add(ring2);

        this.group.position.set(x, y, z);

        this.speed = 0.02;

        this.value = 100;
    }

    update() {
        this.group.rotation.z += this.speed;
    }
}