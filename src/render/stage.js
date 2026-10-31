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
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(PALETTE.sky, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PALETTE.sky, 26, 54);
  scene.background = new THREE.Color(PALETTE.sky);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
  frameDioramaCamera(camera);

  scene.add(new THREE.HemisphereLight(0xfff6e8, 0x8ed0a0, 0.92));
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));

  const sun = new THREE.DirectionalLight(0xfff3d2, 1.28);
  sun.position.set(-6.2, 17.5, 8.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 4;
  sun.shadow.camera.far = 46;
  sun.shadow.camera.left = -14;
  sun.shadow.camera.right = 14;
  sun.shadow.camera.top = 14;
  sun.shadow.camera.bottom = -14;
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.04;
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
