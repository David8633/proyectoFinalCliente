// router.js
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
    const view = document.getElementById("view");
    const route = location.hash.slice(1).toLowerCase();
    const parts = route.split("/");

    const routes = {
        "": () => { 
            listImg(view);
        },
        "peliculas": () => {
            peliculasViews(view);
        },
        "about": () =>{
            aboutViews(view);
        },
        "lista": () => {
            favoritos(view);
        }
    };

   if (parts[0] === "peliculadetalle" && parts[1]) {
        const url = 'http://localhost:3000/peliculas';
        const id = parts[1]; // El ID ahora está en parts[1]
        detalles(id, view,url);
    }else if(parts[0] === "seriedetalle" && parts[1]){
        const url = 'http://localhost:3000/series';
        const id = parts[1]; // El ID ahora está en parts[1]
        detalles(id, view,url);
    }

    if (parts[0] === "lista" && parts[1]) {
        const url = 'http://localhost:3000/peliculas';
        const id = parts[1]; // El ID ahora está en parts[1]
        favoritos(id, view,url);
    }


    // 2. Si NO es la ruta de detalle, manejamos las rutas normales o el inicio
    else {
        // parts[0] será "" para el inicio, "peliculas", o "series"
        const screen = routes[parts[0]] || notFoundView;
        view.innerHTML = screen();
    }
}


// Escuchar cambios en hash
window.addEventListener("hashchange", routes);
window.addEventListener("load", routes);
