import { navbar } from "./navbar.js";
let url = 'http://localhost:3000/peliculas';
/**/

document.addEventListener('DOMContentLoaded', () => { 
    const nav = document.getElementById('nav');
    const div = document.createElement('div');
    div.innerHTML = navbar();
    nav.appendChild(div);

    fetch(url,{
        metdockerhod:'GET'
    })
    .then(res => res.json())
    .then(data => {
      const series = document.getElementById('listPeliculas');
     series.innerHTML = data.map(pelicula => `
    <div class="col mb-3"> 
    <div class="card shadow-sm h-100">
            <img src="${pelicula.url_caratula}" class="card-img-top" alt="Carátula de ${pelicula.titulo}">
            
            <div class="card-body">
                <h5 class="card-title text-light">${pelicula.titulo}</h5>
                <p class="card-text text-light">Género: ${pelicula.generos}</p>
                <p class="card-text text-light bi bi-star-fill">Calificación: ${pelicula.calificacion_imdb}</p>
                <div class="btn-group">
                    //hay que hacer route para que funciones
                    <a href="./../html/peliculaDetalle.html/${pelicula.id}"><button type="button" class="btn btn-sm btn-outline-secondary text-light">View</button></a>
                </div>
            </div>
        </div>
    </div>
`).join('');
    })
    .catch(err => console.error("Error cargando películas:", err));
});

document.getElementById('ver').addEventListener('click',(event)=>{
    let url = 'http://localhost:3000/peliculas';
    let id = event.target.dataset.id;
fetch(
    url+'/'+id,{
        method: 'GET'
    }
).then(response => response.ok? response.json() : Promise.reject(response))
.then(data=>{
    verDetallePelicula(data);
    window.location.href = './../html/peliculaDetalle.html';
})
})


