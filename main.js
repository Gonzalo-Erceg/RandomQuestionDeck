import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import "@fontsource/calistoga";
import { quiz, m } from "./utils/quiz";

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
// const cameraFolder = gui.addFolder("Cámara");
// cameraFolder.add(camera.position, "x", -10, 10);
// cameraFolder.add(camera.position, "y", -10, 10);
// cameraFolder.add(camera.position, "z", -10, 10);

// cameraFolder.open();
// GUI

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
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;
// controls.zoomSpeed = 1.0;

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

  root.children.forEach((element) => {
    if (element.name.startsWith("carta") && quiz.length != 0 && m.length != 0) {
      let random = Math.random() * quiz.length;
      let item = quiz.splice(Math.trunc(random), 1)[0];
      random = Math.random() * m.length;
      let mentor = m.splice(Math.trunc(random), 1)[0];
      let mentorName = root.getObjectByName(mentor);

      let texto = root.getObjectByName(item);
      texto.position.set(0, -0.15, 0);
      mentorName.position.set(0.5, -0.15, 0);
      element.add(mentorName);
      element.add(texto);
    }
  });
  const enterBotton = document.querySelector("#enter");
  enterBotton.removeAttribute("disabled");
  enterBotton.innerHTML = "¡Comenzar!";
  //
});
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
let isView = false;
let numero = 1;
document.querySelector("#boton").addEventListener("click", (event) => {
  let carta = root.getObjectByName(`carta-${numero}`);
  document.querySelector(".arrow").classList.toggle("left");
  event.target.disabled = true;
  if (numero == 9) {
    final();
    return;
  }

  if (!isView) {
    EnterCard(carta, event.target);
  } else {
    removeCard(carta, event.target);
  }
});

document.querySelector("#enter").addEventListener("click", () => {
  const doc = document.querySelector(".main2");
  tl.to(doc, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      doc.remove();
    },
  });
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

function EnterCard(carta, target) {
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
        onComplete: () => {
          isView = true;
          target.disabled = false;
        },
      },
      "<"
    );
}

function removeCard(carta, target) {
  tl.to(carta.position, {
    x: 10,
    onComplete: () => {
      numero++;
      isView = false;
      target.disabled = false;
    },
  });
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

document.querySelector("#close").addEventListener("click", () => {
  const dialog = document.querySelector(".dialog-info");
  dialog.style = "display:none";
});
document.querySelector(".open").addEventListener("click", () => {
  const dialog = document.querySelector(".dialog-info");
  dialog.style = "display:flex";
});

function final() {
  const fin = document.createElement("div");
  const message = document.createElement("h3");
  message.innerHTML = "¡Muchas Gracias por su tiempo!";
  fin.appendChild(message);
  fin.classList.add("fin");
  document.body.appendChild(fin);
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  if (event.ctrlKey && event.altKey && event.key === "0") {
    final();
  }
});
