import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// * Array con las preguntas seleccionadas
const quiz = [
  "¿Por que se sumaron al programa de mentores?",
  "¿Cuál es el mejor consejo profesional que has recibido?",
  "¿Qué estrategias utilizas para guiar y apoyar a tus mentees?",
  "¿Qué es lo que más disfrutas de ser mentor y qué encuentras más desafiante?",
  "¿Qué es lo que más valorás de la persona a la que estás mentoreando?",
  "Cuál fue la mentoría o alumno que más recuerdas y por qué?",
  "¿Qué tipo de feedback consideras más efectivo para el crecimiento profesional de tus mentees?",
  "¿Qué métodos recomiendan para mantener la motivación y la disciplina durante la búsqueda de empleo?",
  "¿Cómo identificas las áreas de mejora en tus mentees y cómo les ayudas a desarrollarlas?",
  "¿Que te insipiro a hacer mentoreo?",
  "¿Cómo evalúas el progreso y el desarrollo de tus mentees?",
  "¿Cómo puedo aprovechar al máximo nuestra relación de mentoría?",
  "¿Cómo adaptas tu estilo de mentoría a diferentes personalidades y estilos de aprendizaje?",
  "¿En qué tema consideras que podes ayudar más a tus mentoreados? ¿cual es tu expertisse?",
  "¿Qué te motivó a aceptar la invitación para ser mentor?",
  "¿Que pensaste la primera vez que escuchaste sobre fundación pescar?",
  "Si tuvieras que elegir saber solo un dato concreto sobre tus mentisse para darte un idea de quien es,¿Cual seria? (edad, que estudia, como llego a pescar, etc)",
  "¿Qué habilidades consideras esenciales para ser un buen mentor en IT?",
  "¿Cómo manejas las diferencias de experiencia y conocimiento entre tus mentees?",
  "¿Cómo identificas las áreas de mejora en tus mentees y cómo les ayudas a desarrollarlas?",
  "¿Cómo puedo destacar en una entrevista de trabajo virtual?",
  "¿Qué técnicas utilizas para motivar a tus mentees durante los momentos difíciles?",
  "¿Cómo adaptas tu estilo de mentoría a diferentes personalidades y estilos de aprendizaje?",
  "¿Cuáles son los aspectos más importantes que los empleadores buscan en un portafolio de proyectos?",
  "¿Cómo puedo manejar la incertidumbre y los rechazos durante el proceso de búsqueda de trabajo?",
  "¿Cómo manejas la presión y el estrés en un entorno competitivo?",
  "¿Cómo evalúas el progreso y el desarrollo de tus mentees?",
  "¿Cómo evalúas el progreso y el desarrollo de tus mentees?",
  "¿Qué debo tener en cuenta al negociar una oferta de trabajo?",
  "¿Cómo equilibras la necesidad de proporcionar orientación con la necesidad de permitir que los mentees aprendan por sí mismos?",
  "¿Qué técnicas utilizas para motivar a tus mentees durante los momentos difíciles?",
];

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

const loader = new GLTFLoader();
const ambientLight = new THREE.AmbientLight(0x404040);
ambientLight.intensity = 0.5;
scene.add(ambientLight);
let root;
loader.load("/cartas.glb", (gltf) => {
  root = gltf.scene;
  const importedCamera = root.getObjectByName("Camera");
  console.log(root);
  scene.add(importedCamera);
  console.log(camera);
  camera.position.x = importedCamera.position.x + 1;
  camera.position.y = importedCamera.position.y;
  camera.position.z = importedCamera.position.z;

  console.log(importedCamera);
  camera.rotation.copy(importedCamera.rotation);
  const spotLight = new THREE.SpotLight();
  spotLight.position.y = 4;
  spotLight.intensity = 15;
  spotLight.angle = Math.PI / 4;
  spotLight.distance = 10;
  spotLight.penumbra = 1.0;
  const spotLight_dos = new THREE.SpotLight();
  spotLight_dos.position.y = 5;
  spotLight_dos.position.z = 4;
  spotLight_dos.position.x = 1.5;
  spotLight_dos.intensity = 15;
  spotLight_dos.angle = Math.PI / 4;
  spotLight_dos.distance = 10;
  spotLight_dos.penumbra = 1.0;

  scene.add(spotLight);
  scene.add(spotLight_dos);
  scene.add(root);
});
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
let numero = 0;
document.querySelector("#boton").addEventListener("click", () => {
  numero++;
  let carta = root.getObjectByName(`carta-${numero}`);
  tl.to(carta.position, {
    y: 3,
    x: 1,
    z: 3,
    duration: 1,
  })
    .to(carta.rotation, {
      y: Math.PI / 2,
      z: Math.PI / 4,
    })
    .to(carta.rotation, {
      x: -Math.PI,
    });
});
