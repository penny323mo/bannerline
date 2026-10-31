import * as THREE from 'three';
import { PALETTE } from './palette.js';

/**
 * Fixed diorama camera on the +z side, looking toward −z (enemy / top of the portrait).
 * Screen-right is world +x. camera.up stays (0, 1, 0); the view is angled, not straight down.
 */
export function frameDioramaCamera(camera, aspect) {
  camera.fov = 52;
  if (Number.isFinite(aspect) && aspect > 0) camera.aspect = aspect;
  camera.position.set(0.2, 16.4, 14.35);
  camera.up.set(0, 1, 0);
  camera.lookAt(0, 0.15, -0.25);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}

export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  // A live shadow map drops SwiftShader under 50 fps once the bunker and soldiers are on screen.
  // Contact is a cheap blob in the island, not a shadow pass.
  renderer.shadowMap.enabled = false;
  renderer.setClearColor(PALETTE.sky, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PALETTE.sky, 26, 54);
  scene.background = new THREE.Color(PALETTE.sky);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
  frameDioramaCamera(camera);

  scene.add(new THREE.HemisphereLight(0xc5d4e2, 0x5a6b42, 0.72));
  scene.add(new THREE.AmbientLight(0xe7eeea, 0.32));

  const sun = new THREE.DirectionalLight(0xfff4e2, 1.05);
  sun.position.set(-6.2, 17.5, 8.2);
  sun.castShadow = false;
  scene.add(sun);

  function resize() {
    const w = canvas.clientWidth || 390;
    const h = canvas.clientHeight || 844;
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
  }

  return { renderer, scene, camera, resize };
}
