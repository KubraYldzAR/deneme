import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/ARButton.js';

// ... (Sahne kurulumu aynı)

loader.load('model.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            // Mavi çerçevenin dış kısımlarını tamamen görünmez yap (Derinlik tamponu için)
            if (child.material.name === 'Portal_Mat') {
                child.material = new THREE.MeshBasicMaterial({ 
                    colorWrite: false, 
                    depthWrite: true 
                });
            }
            
            // Yeşil iç kısımları (Occluder_Mat) "portal geçidi" yap
            if (child.material.name === 'Occluder_Mat') {
                child.material = new THREE.MeshBasicMaterial({ 
                    colorWrite: false, // Buradan bakılınca arkasını (pengueni) göstersin
                    depthWrite: false 
                });
            }
        }
    });
    scene.add(gltf.scene);
});
