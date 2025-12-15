import * as T from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import * as TARGETS from './targets.js';

export function createEnvironment(scene) {
    const ambientLight = new T.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let groundGeometry = new T.PlaneGeometry(100, 100);
    let groundMaterial;
    if(localStorage.getItem("ninjaPrototypeMode") === "true") {
        groundMaterial = new T.MeshStandardMaterial({ color: 'rgb(100, 100, 100)' });
    }
    else {

        let textureLoader = new T.TextureLoader();
        let groundTexture = textureLoader.load('https://kewkew-33.github.io/Ninja-in-Training/public/public/images/pexels-fwstudio-33348-129731.jpg');

        groundTexture.wrapS = T.RepeatWrapping;
        groundTexture.wrapT = T.RepeatWrapping;
        groundTexture.repeat.set(10, 10);

        groundMaterial = new T.MeshStandardMaterial({ map: groundTexture });

    }
    let ground = new T.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    let wallPlane = new T.PlaneGeometry(100, 50);

    let wallMaterial;

    if(localStorage.getItem("ninjaPrototypeMode") === "true") {
        wallMaterial = new T.MeshStandardMaterial({ color: 'rgb(150, 111, 51)' });
    } else {
        let textureLoader = new T.TextureLoader();
        let wallTexture = textureLoader.load('../public/images/wall.jpg');
        
        wallTexture.wrapS = T.RepeatWrapping;
        wallTexture.wrapT = T.RepeatWrapping;
        wallTexture.repeat.set(2, 2);
        
        wallMaterial = new T.MeshStandardMaterial({ map: wallTexture });
    }

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

    let dividerMat;
    if (localStorage.getItem("ninjaPrototypeMode") === "true") {
        dividerMat = new T.MeshStandardMaterial({ color: 'rgba(50, 50, 50, 1)' });
    } else {
        
        let textureLoader = new T.TextureLoader();
        let dividerTexture = textureLoader.load('https://kewkew-33.github.io/Ninja-in-Training/public/images/pexels-fwstudio-33348-129731.jpg');
        dividerTexture.wrapS = T.RepeatWrapping;
        dividerTexture.wrapT = T.RepeatWrapping;
        dividerTexture.repeat.set(10, 0.2);
        dividerMat = new T.MeshStandardMaterial({ map: dividerTexture });
    }
        
    let divider = new T.Mesh(dividerGeom, dividerMat);
    divider.position.y = 1;
    scene.add(divider);

    let ceilingGeom = new T.PlaneGeometry(100, 100);

    let ceilingMat;
    if (localStorage.getItem("ninjaPrototypeMode") === "true") {
        ceilingMat = new T.MeshStandardMaterial({ color: 'rgba(70, 70, 70, 1)' });
    } else {
        let textureLoader = new T.TextureLoader();
        let ceilingTexture = textureLoader.load('https://kewkew-33.github.io/Ninja-in-Training/public/images/ceiling.jpg');
        ceilingMat = new T.MeshStandardMaterial({ map: ceilingTexture });
    }
    let ceiling = new T.Mesh(ceilingGeom, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 50;
    scene.add(ceiling);

}

export function createTargets() {

    let targets = [];

    let target1 = new TARGETS.spin200(0, 0, -40, 2);
    targets.push(target1);

    let target2 = new TARGETS.spin200(-50, 20, -20, 1);
    targets.push(target2);

    let target3 = new TARGETS.spin200(50, 10, -15, 3);
    targets.push(target3);

    let target4 = new TARGETS.Cube500(48, 80, -48);
    targets.push(target4);

    let target5 = new TARGETS.Cube500(-48, 60, -48);
    targets.push(target5);

    let target6 = new TARGETS.Dodec4000(30, 1, -45);
    targets.push(target6);

    let target7 = new TARGETS.Dodec4000(-30, 1, -45);
    targets.push(target7);

    let target8 = new TARGETS.Sphere800(-50, 30, -30, 0);
    targets.push(target8);

    let target9 = new TARGETS.Sphere800(53, 25, -25, 1);
    targets.push(target9);

    let target10 = new TARGETS.Sphere800(50, 2, -47, 2);
    targets.push(target10);

    let target11 = new TARGETS.TorusKnot15000();
    targets.push(target11);

    let target12 = new TARGETS.Capsule1000();
    targets.push(target12);

    let target13 = new TARGETS.Capsule1000();
    targets.push(target13);

    let target14 = new TARGETS.Capsule1000();
    targets.push(target14);

    let target15 = new TARGETS.Capsule1000();
    targets.push(target15);

    return targets;

}
