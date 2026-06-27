import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/ARButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer));

const loader = new GLTFLoader();

// Hata ayıklama ile model yükleme
loader.load(
    'model.glb', 
    (gltf) => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                // Blender'daki materyal isimlerinle tam eşleşmeli
                if (child.material.name === 'Occluder_Mat') {
                    child.material = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true });
                } else if (child.material.name === 'Portal_Mat') {
                    child.material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5 });
                }
            }
        });
        scene.add(gltf.scene);
    },
    (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% yüklendi'); },
    (error) => { console.error('Model yüklenirken hata oluştu:', error); }
);

renderer.setAnimationLoop((time, frame) => { renderer.render(scene, camera); });
