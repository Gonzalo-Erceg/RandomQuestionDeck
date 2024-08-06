import "./style.css";
import { gsap } from "gsap";
const carta = document.querySelector("#carta");
const q = document.querySelector(".pregunta");
const boton = document.querySelector("#boton");

// ** Uso todo esto para poder calcular y mover la carta justo al centro de la pagina (si quieren que lo explique en llamada lo hago)
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const elemWidth = carta.offsetWidth;
const elemHeight = carta.offsetHeight;
const centerX = (viewportWidth - elemWidth) / 2;
const centerY = (viewportHeight - elemHeight) / 2;
const rect = carta.getBoundingClientRect();
const currentX = rect.left + window.scrollX;
const currentY = rect.top + window.scrollY;
const deltaX = centerX - currentX;
const deltaY = centerY - currentY;
let state = false;

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

// * Uso la biblioteca GSAP para la animacion de las cartas, es bastante simple de usar.
// ? https://gsap.com
let tl = gsap.timeline();

boton.addEventListener("click", () => {
  tl.to("#boton", { y: 10, duration: 0.2 }).to("#boton", {
    y: 0,
    duration: 0.2,
  });
  if (state) {
    let random = Math.random() * 30;
    random = Math.floor(random);
    tl.to("#carta", { x: 300, y: 150, rotateY: 0, duration: 0.5 }).to(
      "#carta",
      {
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: 0.5,
        onComplete: () => {
          q.innerHTML = quiz[random];
        },
      }
    );

    tl.to("#carta", {
      x: `+=${deltaX}`,
      y: `+=${deltaY}`,
      rotateY: 180,
      rotateZ: -90,
      duration: 0.25,
      delay: 1,
    });
  } else {
    tl.to("#carta", {
      x: `+=${deltaX}`,
      y: `+=${deltaY}`,
      rotateY: 180,
      rotateZ: -90,
      duration: 0.25,
    });
    state = true;
  }
});
