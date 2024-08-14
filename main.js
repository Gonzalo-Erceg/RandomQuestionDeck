import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ColorCorrectionShader } from "three/examples/jsm/shaders/ColorCorrectionShader.js";
import "@fontsource/calistoga";
const gui = new GUI();
// * Array con las preguntas seleccionadas

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let tl = gsap.timeline();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GUI
const cameraFolder = gui.addFolder("Cámara");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);

cameraFolder.open();
// GUI
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
composer.addPass(bloomPass);
const colorCorrectionPass = new ShaderPass(ColorCorrectionShader);
composer.addPass(colorCorrectionPass);
const loader = new GLTFLoader();
const ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 0;
scene.add(ambientLight);
let root;
let lights = [];
let lightsPositions = [
  { x: 4, z: 4 },
  { x: 4, z: -4 },
  { x: -4, z: 4 },
  { x: -4, z: -4 },
];
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade una ligera amortiguación al movimiento
controls.dampingFactor = 0.25; // Ajusta el factor de amortiguación
controls.enableZoom = true; // Habilita el zoom
controls.zoomSpeed = 1.0; // Ajusta la velocidad de zoom

loader.load("/cartas.glb", (gltf) => {
  root = gltf.scene;

  camera.position.x = 0;
  camera.position.y = 5;
  camera.position.z = 4;

  camera.rotation.x = -Math.PI / 4;
  lightsPositions.forEach((element) => {
    lights.push(createLight(element.x, element.z));
  });
  scene.add(root);

  // GUi

  root.children.forEach((element) => {
    if (element.name.startsWith("carta")) {
      let texto = CrearTexto(element.name);
      element.add(texto);
    }
  });
  //
});
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
let isView = false;
let numero = 1;
document.querySelector("#boton").addEventListener("click", () => {
  let carta = root.getObjectByName(`carta-${numero}`);

  if (!isView) {
    EnterCard(carta);
  } else {
    removeCard(carta);
  }
});

document.querySelector("#enter").addEventListener("click", () => {
  tl.to(lights[0], {
    intensity: 30,
    duration: 0.5,
  })
    .to(
      ambientLight,
      {
        intensity: 0.25,
      },
      "<"
    )
    .to(lights[1], {
      intensity: 30,
      duration: 0.5,
    })
    .to(
      ambientLight,
      {
        intensity: 0.5,
      },
      "<"
    )
    .to(lights[2], {
      intensity: 30,
      duration: 0.5,
    })
    .to(
      ambientLight,
      {
        intensity: 0.75,
      },
      "<"
    )
    .to(lights[3], {
      intensity: 30,
      duration: 0.5,
    })
    .to(
      ambientLight,
      {
        intensity: 1,
      },
      "<"
    );
});

function EnterCard(carta) {
  tl.to(carta.position, {
    x: 0,
    z: 2,
    y: 1.5,
    duration: 0.5,
  })
    .to(
      carta.rotation,
      {
        y: -Math.PI / 2,
      },
      "<"
    )
    .to(carta.position, {
      y: 3,
      delay: -0.5,
      duration: 0.5,
    })
    .to(
      carta.rotation,
      {
        z: Math.PI * 0.75,
        onComplete: () => (isView = true),
      },
      "<"
    );
}

function removeCard(carta) {
  tl.to(carta.position, {
    x: 10,
    onComplete: () => {
      numero++, (isView = false);
    },
  });
}

function CrearTexto(texto) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(`${texto}`, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);

  // Crear un material con la textura del texto
  const textMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  });

  // Crear un plano para el texto
  const textGeometry = new THREE.PlaneGeometry(1, 0.5); // Ajusta el tamaño del plano
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(0, -0.1, 0);
  textMesh.rotation.x = -Math.PI / 2;
  textMesh.rotation.y = Math.PI;
  textMesh.rotation.z = Math.PI / 2;

  return textMesh;
}

function createLight(x, z) {
  const spotLight = new THREE.SpotLight();

  spotLight.position.set(x, 4, z);
  spotLight.intensity = 0;
  spotLight.angle = Math.PI / 4;
  spotLight.distance = 10;
  spotLight.penumbra = 1.0;
  scene.add(spotLight);
  return spotLight;
}

document.querySelector("#apa").addEventListener("click", () => {
  document.querySelector(".apa").setAttribute("hidden", false);
});
