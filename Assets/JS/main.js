const ranges = document.querySelectorAll(".range");
const URL = "https://swapi.dev/api/people/";
const template = document.querySelector("#characterCardTemplate");

const principales = new Set();
const secundarios = new Set();
const otros = new Set();

class personaje {
  constructor(nombre, estatura, peso, tipo) {
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
    this.tipo = tipo;
  }
}

const personajeConseguido = async (id) => {
  try {
    const res = await fetch(URL + id);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const personajeInsertado = async (id, tipo, set) => {
  const data = await personajeConseguido(id);
  const { name, height, mass } = data;
  const nuevoPersonaje = new personaje(name, height, mass, tipo);

  set.add(nuevoPersonaje);
  formarPersonaje(nuevoPersonaje);
};

const formarPersonaje = (personaje) => {
  const templateClone = template.content.cloneNode(true);
  const listaSeleccionada = document.querySelector(`#lista${personaje.tipo}`);

  templateClone
    .querySelector(".circle")
    .classList.add(`${personaje.tipo.toLowerCase()}`);
  templateClone.querySelector(".card-nombre").textContent = personaje.nombre;
  templateClone.querySelector(
    ".card-info"
  ).textContent = `Estatura: ${personaje.estatura} cm. Peso: ${personaje.peso} kg.`;

  listaSeleccionada.appendChild(templateClone);

  const animated = listaSeleccionada.lastElementChild;

  gsap.fromTo(
    animated,
    { opacity: 0, y: "-1rem" },
    { opacity: 1, y: 0, duration: 1 }
  );
};

function* generarPersonajes(inicio, fin, tipo, set) {
  for (let i = inicio; i <= fin; i++) {
    yield personajeInsertado(i, tipo, set);
  }

  return "terminado";
}

const generadorPrincipales = generarPersonajes(
  1,
  5,
  "Principales",
  principales
);
const generadorSecundarios = generarPersonajes(
  6,
  11,
  "Secundarios",
  secundarios
);
const generadorOtros = generarPersonajes(12, 17, "Otros", otros);

ranges.forEach((item) => {
  let cuenta = 1;
  item.addEventListener("mouseenter", (e) => {
    if (cuenta <= 5) {
      switch (e.target.dataset.generador) {
        case "Principales":
          generadorPrincipales.next();

          break;

        case "Secundarios":
          generadorSecundarios.next();
          break;

        case "Otros":
          generadorOtros.next();
          break;
      }

      cuenta++;
    } else return false;
  });
});

// function cambiarTodo(numPersona) {
//   let url = `https://swapi.dev/api/people/${numPersona}`;
//   fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       $(row).append(
//         `<div class="col-12 col.md-6 col-lg-4 a">
//             <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
//             style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
//             <div class="timeline-icon" style="background-color:${color}"><div>
//             <div class:"timeline-text">
//                 <h6>${data.name}</h6>
//                 <p>Estatura: ${data.height} cm. Peso: ${data.mass} kg </p>
//             </div>
//             </div>
//             </div>
//             `
//       );
//     })
//     .catch((error) => {
//       return console.error(error);
//     });
// }

// function generadorPersonajes() {
//   function* generador(row, color, numPersona) {
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     return "Terminado :D";
//   }
//   let contador1 = 0;
//   $("#card1").on("mouseenter", () => {
//     contador1++;
//     if (contador1 <= 5) {
//       let generador1 = generador("#card1", "circleSalmon", contador1);
//       generador1.next();
//     } else {
//       console.log("Ya no más...");
//     }
//   });
//   let contador2 = 6;
//   $("p:contains(6 - 11)").mouseenter(() => {
//     contador2++;
//     if (contador2 <= 11) {
//       let generador2 = generador(".secondRow", "lightgreen", contador2);
//       generador2.next();
//     } else {
//       console.log("Ya no más...");
//     }
//   });
//   let contador3 = 12;
//   $("p:contains(12 - 17)").mouseenter(() => {
//     contador3++;
//     if (contador3 <= 17) {
//       let generador3 = generador(".thirdRow", "lightblue", contador3);
//       generador3.next();
//     } else {
//       console.log("Ya no más...");
//     }
//   });
// }

// $(function () {
//   function* generador(row, color, numPersona) {
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     cambiarTodo(row, color, numPersona);
//     yield;
//     return "Terminado :D";
//   }
//   let contador1 = 0;
//   $("p:contains(1 - 5)").mouseenter(() => {
//     contador1++;
//     if (contador1 <= 5) {
//       let generador1 = generador(".firstRow", "salmon", contador1);
//       generador1.next();
//     } else {
//       console.log("Ya no más...");
//     }
//   });
//   let contador2 = 6;
//   $("p:contains(6 - 11)").mouseenter(() => {
//     contador2++;
//     if (contador2 <= 11) {
//       let generador2 = generador(".secondRow", "lightgreen", contador2);
//       generador2.next();
//     } else {
//       console.log("Ya no más...");
//     }
//   });
//   let contador3 = 12;
//   $("p:contains(12 - 17)").mouseenter(() => {
//     contador3++;
//     if (contador3 <= 17) {
//       let generador3 = generador(".thirdRow", "lightblue", contador3);
//       generador3.next();
//     } else {
//       console.log("Ya no más...");
//     }
//   });
// });
