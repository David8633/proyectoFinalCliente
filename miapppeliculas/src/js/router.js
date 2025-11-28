// router.js
import { navbar } from './navbar.js';
import { peliculasView } from "./views/peliculasViews.js";
import { peliculaDetalleView } from "./peliculaDetalles.js";
import { listImg } from './listImg.js';

function notFoundView() {
    return "<h1>Página no encontrada</h1>";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nav").innerHTML = navbar();
});

export function routes() {
    const view = document.getElementById("view");
    const route = location.hash.slice(1).toLowerCase();
    const parts = route.split("/");

    const routes = {
        "": () => { 
            listImg();
            return "<h1>Inicio</h1>";
        },
        "peliculas": () => {
            peliculasView(view);
            return ""; 
        }
    };

    // 👉 DETALLE DE PELÍCULA
    if (parts[0] === "peliculas" && parts[1]) {
        const id = parts[1];
        view.innerHTML = peliculaDetalleView(id, view);
        return;
    }

    // 👉 RENDERIZAR VISTA NORMAL
    const screen = routes[parts[0]] || notFoundView;
    view.innerHTML = screen();
}

// Escuchar cambios en hash
window.addEventListener("hashchange", routes);
window.addEventListener("load", routes);
