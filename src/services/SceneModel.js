import {
  AmbientLight,
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';

function buildDefaultScene(parentElement, cameraFar = 201) {
  const { width, height } = parentElement.getBoundingClientRect();
  const widthHeightRatio = width / height;
  const camera = new PerspectiveCamera(65, widthHeightRatio, 1, cameraFar);
  const scene = new Scene();
  const renderer = new WebGLRenderer({ antialias: true });
  camera.aspect = widthHeightRatio;
  scene.background = new Color(0x000000);
  scene.add(camera);
  renderer.setSize(width, height);
  return { camera, scene, renderer };
}

export default class SceneModel {
  constructor(rendererContainer) {
    const parentElement = rendererContainer || document.body;
    const { camera, scene, renderer } = buildDefaultScene(parentElement);
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.ambientLight = new AmbientLight(0xFFFFFF);
    this.scene.add(this.ambientLight);
    parentElement.appendChild(renderer.domElement);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  setSize(width, height) {
    const widthHeightRatio = width / height;
    this.camera.aspect = widthHeightRatio;
    this.renderer.setSize(width, height);
  }
}
