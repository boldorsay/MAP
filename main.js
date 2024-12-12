import * as THREE from "three";
import { DeviceOrientationControls } from "./DeviceOrientationControls";

let camera, scene, renderer, controls;
let texture;

document
  .getElementById("enable-orientation")
  .addEventListener("click", function () {
    requestDeviceOrientationPermission();
  });

function addTextureImg(url) {
  const loader = new THREE.TextureLoader();
  loader.load(url, (loadedTexture) => {
    texture = loadedTexture;
    init();
  });
}

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );

  scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(1000, 60, 40);
  geometry.scale(-1, 1, 1);

  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start the process by loading a texture from a specified URL
addTextureImg(
  "/img/full-spherical-hdri-panorama-360-degrees-empty-exhibition-space-backdrop-exhibitions-events-tile-floor-marketing-mock-up-3d-render-illustration_161844-361.avif"
);
function animate() {
  requestAnimationFrame(animate);

  // Only update controls if they are defined
  if (controls) {
    controls.update();
  }

  renderer.render(scene, camera);
}

function requestDeviceOrientationPermission() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          initDeviceOrientationControls();
        } else {
          console.error("DeviceOrientation permission not granted");
        }
      })
      .catch(console.error);
  } else {
    // Automatically initialize controls if the requestPermission method is not supported
    initDeviceOrientationControls();
  }
}

function initDeviceOrientationControls() {
  controls = new DeviceOrientationControls(camera);

  // Start the animation loop here, after controls are initialized
  animate();
}
