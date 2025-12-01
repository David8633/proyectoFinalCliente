// router.js (Corregido)
import { navbar } from './navbar.js';
import { peliculasViews } from "./views/peliculasViews.js";
import { detalles } from "./detalles.js";
import { listImg } from './listImg.js';
import { aboutViews } from './views/aboutViews.js';
import { favoritos } from './favoritos.js';

function notFoundView() {
    return "<h1>Página no encontrada</h1>";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nav").innerHTML = navbar();
});

export function routes() {
    const url ='https://raw.githubusercontent.com/David8633/proyectoFinalCliente/refs/heads/main/data.json';
    const view = document.getElementById("view");
    const route = location.hash.slice(1).toLowerCase();
    const parts = route.split("/");

    const routes = {
        "": () => listImg(view),
        "peliculas": () => peliculasViews(view, url),
        "about": () => aboutViews(view),
        "lista": () => favoritos(null, view, url) // Asegurar que se llama en modo renderizado
    };

    let found = false;

    // 1. Manejar rutas con ID (detalle o favoritos con ID)
    if (parts[0] === "peliculadetalle" && parts[1]) {
        const id = parts[1];
        detalles(id, view, url);
        found = true;
    } 
    else if (parts[0] === "lista" && parts[1]) {
        const id = parts[1];
        favoritos(id, view, url);
        found = true;
    } 
    // 2. Manejar rutas normales (Inicio, Películas, About)
    else if (routes[parts[0]]) {
        const screenFunction = routes[parts[0]];
        screenFunction(); 
        found = true;
    } 
    // 3. Ruta no encontrada
    else {
        view.innerHTML = notFoundView();
    }
}


// Escuchar cambios en hash
window.addEventListener("hashchange", routes);
window.addEventListener("load", routes);