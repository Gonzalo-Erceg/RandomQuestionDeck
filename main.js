import "./style.css";
import { gsap } from "gsap";
const carta = document.querySelector(".q");
let number = 1;
const boton = document.querySelector("#boton");
let state = false;
let tl = gsap.timeline();
boton.addEventListener("click", () => {
  if (state) {
    tl.to("#carta", { x: 300, y: 150, rotateY: 0, duration: 0.25 }).to(
      "#carta",
      {
        x: 0,
        y: 0,
        duration: 0.25,
      }
    );

    tl.to("#carta", {
      x: 1000,
      y: 500,
      delay: 1,
      onComplete: () => {
        carta.innerHTML = `${number}`;
        number++;
      },
    }).to("#carta", {
      x: 200,
      y: 300,
      rotateY: 180,
      duration: 0.25,
    });
  } else {
    carta.innerHTML = `${number}`;
    number++;
    tl.to("#carta", { x: 1000, y: 500 }).to("#carta", {
      x: 200,
      y: 300,
      rotateY: 180,
    });
    state = true;
  }
});
