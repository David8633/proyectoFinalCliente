let url = 'http://localhost:3000/caratulas';

document.addEventListener('DOMContentLoaded', () => { 
    fetch(url, { method: 'GET' })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => { 
        const carrusel = document.getElementById('imgs');
        carrusel.innerHTML = ""; // Limpiar contenido inicial

        data.slice(0, 4).forEach((item, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');

            div.classList.add('carousel-item');
            if (index === 0) div.classList.add('active'); // Primer slide activo

            img.src = item.url_caratula;
            img.alt = item.titulo;
            img.classList.add('d-block', 'w-100');

            div.appendChild(img);
            carrusel.appendChild(div);
        });
    }) 
    .catch(err => console.error("Error cargando carátulas:", err));

    fetch(url)
    .then(res => res.json())
    .then(data => {
      const populares = document.getElementById('populares');
      populares.innerHTML = data.slice(0, 4).map(pelicula => `
        <div class="col">
          <div class="card">
            <img src="${pelicula.url_caratula}" class="card-img-top" alt="${pelicula.titulo}">
            <div class="card-body">
              <h5 class="card-title">${pelicula.titulo}</h5>
              <p class="card-text">⭐ ${pelicula.calificacion_imdb}</p>
            </div>
          </div>
        </div>`).join('');
    })
    .catch(err => console.error("Error cargando películas:", err));
});



