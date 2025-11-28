document.addEventListener('DOMContentLoaded', () => { 
    let url = 'http://localhost:3000/peliculas';
    const nav = document.getElementById('nav');
    const div = document.createElement('div');
    div.innerHTML = navbar();
    nav.appendChild(div);

    const [urlLocal,id] =  window.location().split('/');

    fetch(url+'/'+id,{
        metdockerhod:'GET'
    })
    .then(res => res.json())
    .then(data => {
      const peliculaDetalle = document.getElementById('detalles');
     peliculaDetalle.innerHTML = data.map(objeto => 
    `<div class="card-body">
                        <div class="col-md-4">
                            <div class="detail-image-wrapper">
                                <img src=${objeto.url_caratula}
                                        class="img-fluid rounded-start" 
                                        alt="Título de la Película">
                            </div>
                        </div>
                            <h2 class="card-title text-warning">${objeto.titulo}</h2>
                            
                            <p class="text-muted mb-3">${objeto.ano_lanzamiento}</p>
                            <p class="text-muted mb-3">Genero: ${objeto.genero}</p>

                            <p class="card-text">
                                Resumen : ${objeto.resumen}
                            </p>
                            
                            <hr class="border-secondary">

                            <div class="d-flex flex-wrap gap-4">
                                <div>
                                    <small class="text-muted d-block">Calificación IMDb</small>
                                    <p class="fw-bold mb-0 text-success"><i class="bi bi-star-fill me-1"></i> ${objeto.calificacion_imdb} / 10</p>
                                </div>
                            </div>`
).join('');
    })
    .catch(err => console.error("Error cargando películas:", err));
});

