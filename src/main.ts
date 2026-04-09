import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

console.log(`Setting camera perspective to: ${window.innerWidth / window.innerHeight}`)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

console.log(`Setting renderer size to width: ${window.innerWidth} and height: ${window.innerHeight}`)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color().setHex(0xAAAAAA);

const renderCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate(time: number) {
    renderer.render(scene, camera);
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;
  }
  renderer.setAnimationLoop(animate);
};

const addAmbientLight = () => {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
}

let bug: THREE.Group | undefined;

const renderBug = () => {
  addAmbientLight();

  const loader = new GLTFLoader();

  loader.load('bug-model/scene.gltf', 
    (gltf) => {
      scene.add(gltf.scene);
      bug = gltf.scene;
      // gltf.scene.children[0].geometry.center();
      bug.rotation.x = Math.PI / 2; // Place bug with top towards from camera
    },
    (e) => console.log('onProgressEvent', e),
    (error) => console.error('Error', error) 
  )

  camera.position.z = 5;

  function animate(_time: number) {
    renderer.render(scene, camera);
    if (bug) {
      // bug.rotation.x = time / 2000;
      // bug.rotation.y = time / 1000;
    }
  }
  renderer.setAnimationLoop(animate);
}

const printRotation = (rotation: THREE.Euler) => {
  console.log('Bug position:', 'X', rotation.x.toFixed(2), 'Y', rotation.y.toFixed(2), 'Z', rotation.z.toFixed(2))
}

const addKeyboardListener = () => {
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'a') {
      console.log('a pressed')
      bug?.rotateY(Math.PI / 2)
    } else if (e.key === 'd') {
      console.log('d pressed')
      bug?.rotateY(- Math.PI / 2)
    } else {
      console.log('Not handling event', e)
    }
    bug && printRotation(bug.rotation);
  })
}

// renderCube();
renderBug();
addKeyboardListener();

