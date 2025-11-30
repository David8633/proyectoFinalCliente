// peliculasView.js

// 🛑 IMPORT DE NAVBAR ELIMINADO: Ya no se necesita aquí.
let url = 'http://localhost:3000/peliculas';

/**/

export function peliculasViews(view){
    // 🛑 ELIMINADO: Esta inyección debe ocurrir SOLO una vez en el router.js
    // const nav = document.getElementById("nav");
    // nav.innerHTML = navbar(); 


    return fetch(url,{
        method:'GET'
    })
    .then(res => res.json())
    .then(data => {
        // La vista utiliza el argumento 'view' correctamente
        view.innerHTML = `
  <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Películas</h1>
                    </div>
                </div>
  </section>
        <div class="container"> 
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
      ${data.map(pelicula => `
        <div class="col mb-3"> 
          <div class="card shadow-sm h-100">
            <img src="${pelicula.url_caratula}" class="card-img-top" alt="Carátula de ${pelicula.titulo}">
            <div class="card-body">
              <h5 class="card-title text-light">${pelicula.titulo}</h5>
              <p class="card-text text-light">Género: ${pelicula.generos}</p>
              <p class="card-text text-light"><i class="bi bi-star-fill"></i> ${pelicula.calificacion_imdb}</p>
              <div class="btn-group">
                <a href="#peliculaDetalle/${pelicula.id}">
                  <button type="button" class="btn btn-sm btn-outline-secondary text-light">View</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`})};