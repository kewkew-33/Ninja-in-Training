import * as T from 'three';
import * as TARGETS from './targets.js';

export function createEnvironment(scene) {
    const ambientLight = new T.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let groundGeometry = new T.PlaneGeometry(100, 100);
    let groundMaterial = new T.MeshStandardMaterial({ color: 'rgb(196, 164, 132)' });
    let ground = new T.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    let wallPlane = new T.PlaneGeometry(100, 50);
    let wallMaterial = new T.MeshStandardMaterial({ color: 'rgb(150, 111, 51)' });
    let wall1 = new T.Mesh(wallPlane, wallMaterial);
    let wall2 = new T.Mesh(wallPlane, wallMaterial);
    let wall3 = new T.Mesh(wallPlane, wallMaterial);
    let wall4 = new T.Mesh(wallPlane, wallMaterial);

    wall1.position.set(0, 25, -50);
    wall2.position.set(0, 25, 50);
    wall2.rotation.y = Math.PI;
    wall3.position.set(-50, 25, 0);
    wall3.rotation.y = Math.PI / 2;
    wall4.position.set(50, 25, 0);
    wall4.rotation.y = -Math.PI / 2;

    scene.add(wall1);
    scene.add(wall2);
    scene.add(wall3);
    scene.add(wall4);

    let dividerGeom = new T.BoxGeometry(100, 2, 2);
    let dividerMat = new T.MeshStandardMaterial({ color: 'rgba(50, 50, 50, 1)' });
    let divider = new T.Mesh(dividerGeom, dividerMat);
    divider.position.y = 1;
    scene.add(divider);

    let ceilingGeom = new T.PlaneGeometry(100, 100);
    let ceilingMat = new T.MeshStandardMaterial({ color: 'rgba(70, 70, 70, 1)' });
    let ceiling = new T.Mesh(ceilingGeom, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 50;
    scene.add(ceiling);

}

export function createTargets() {

    let targets = [];

    let target1 = new TARGETS.spin100(0, 0, -40, 2);
    targets.push(target1);

    let target2 = new TARGETS.spin100(-50, 20, -20, 1);
    targets.push(target2);

    let target3 = new TARGETS.spin100(50, 10, -15, 3);
    targets.push(target3);

    let target4 = new TARGETS.Cube500(48, 80, -48);
    targets.push(target4);

    let target5 = new TARGETS.Cube500(-48, 60, -48);
    targets.push(target5);

    return targets;

}