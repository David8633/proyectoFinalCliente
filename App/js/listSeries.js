let url = 'http://localhost:3000/series';
/**/


document.addEventListener('DOMContentLoaded', () => { 
    fetch(url,{
        metdockerhod:'GET'
    })
    .then(res => res.json())
    .then(data => {
      const series = document.getElementById('listSeries');
     series.innerHTML = data.map(serie => `
    <div class="col mb-3"> 
    <div class="card shadow-sm h-100">
            <img src="${serie.url_caratula}" class="card-img-top" alt="Carátula de ${serie.titulo}">
            
            <div class="card-body">
                <h5 class="card-title text-light">${serie.titulo}</h5>                
                <p class="card-text text-light">Género: ${serie.generos}</p>
                <p class="card-text text-light bi bi-star-fill">Calificación: ${serie.calificacion_imdb}</p>
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary text-light">View</button>
                </div>
            </div>
        </div>
    </div>
`).join('');
    })
    .catch(err => console.error("Error cargando películas:", err));
});



