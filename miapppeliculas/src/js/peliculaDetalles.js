export function peliculaDetalleView(id,view){
    let url = 'http://localhost:3000/peliculas';
    const nav = document.getElementById('nav');
    const div = document.createElement('div');
    div.innerHTML = navbar();
    nav.appendChild(div);

    fetch(url+'/'+id,{
        metdockerhod:'GET'
    })
    .then(res => res.json())
    .then(pelicula => {
     view.innerHTML = `
        <div class="card bg-dark text-white">
          <img src="${pelicula.url_caratula}" class="card-img-top" alt="${pelicula.titulo}">
          <div class="card-body">
            <h2>${pelicula.titulo}</h2>
            <p>Género: ${pelicula.generos}</p>
            <p>Calificación: ${pelicula.calificacion_imdb}</p>
            <p>${pelicula.resumen}</p>
          </div>
        </div>
      `;
    })
    .catch(err => {
      document.getElementById("view").innerHTML = `<p>Error cargando detalle: ${err}</p>`;
    });
}

