export function favoritos(id, view, url) {
    const storedFavorites = localStorage.getItem('peliculaFavorita');
    let peliculaFavorita = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (!id) {
        view.innerHTML = "";
        if (peliculaFavorita.length === 0) {
            view.innerHTML = `<p class="alert alert-info">No hay películas en tu lista de favoritos.</p>`;
        } else {
            renderizarFavoritos(peliculaFavorita, view);
        }
        return;
    }

    view.innerHTML = "";

    fetch(`${url}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const peliculaId = data.id;
        
        const yaExiste = peliculaFavorita.some(favorito => favorito.id == peliculaId ); 
        
        if (data && !yaExiste) {
            const favorito = data.peliculas.filter(p => p.id == id)[0];
            if (favorito) {
                peliculaFavorita.push(favorito);
                localStorage.setItem('peliculaFavorita', JSON.stringify(peliculaFavorita));
            } else {
                view.innerHTML = `<p class="alert alert-danger">Error: No se encontró la película con ID ${id} en la respuesta.</p>`;
                return;
            }
        } else if (yaExiste) {
            view.innerHTML = `<p class="alert alert-warning">⚠️ Esta película ya está guardada en tus favoritos.</p>`;
        } else {
            view.innerHTML = `<p class="alert alert-danger">Error: No se pudo obtener la información de la película.</p>`;
            return;
        }

        renderizarFavoritos(peliculaFavorita, view); 
    })
    .catch(error => {
        console.error("Error al obtener la película:", error);
        view.innerHTML = `<p class="alert alert-danger">Error al cargar la película: ${error.message}</p>`;
    });
}

function renderizarFavoritos(peliculaFavorita, view) {
    const favRows = peliculaFavorita.map(favorito => {
        const currentId = favorito.imdbID || favorito.id;
        return `
            <tr>
                <td class="text-sm rounded-tl-lg">${favorito.titulo || 'N/A'}</td>
                <td class="text-sm bi bi-star-fill"> ${favorito.calificacion_imdb || 'N/A'}/10</td>
                <td class="text-sm">${favorito.ano_lanzamiento || 'N/A'}</td>
                <td class="text-sm">${favorito.generos || 'N/A'}</td>
                <td class="text-sm rounded-tr-lg">
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${currentId}">Eliminar</button>
                </td>
            </tr>
        `;
    }).join('');

    view.innerHTML += `<div id="tabla-favoritos-container" class="table-responsive rounded-lg border mt-3">
        <table class="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th scope="col" class="text-sm rounded-tl-lg">Título</th>
                    <th scope="col" class="text-sm">Calificacion</th>
                    <th scope="col" class="text-sm">Año</th>
                    <th scope="col" class="text-sm">Género</th>
                    <th scope="col" class="text-sm rounded-tr-lg">Acción</th>
                </tr>
            </thead>
            <tbody>
                ${favRows}
            </tbody>
        </table>
    </div>`;
}


if (!document.favoriteListenerAttached) {
    document.favoriteListenerAttached = true;
    
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            
            const peliculaIdToDelete = event.target.getAttribute('data-id');
            
            let favo = JSON.parse(localStorage.getItem('peliculaFavorita')) || [];
            
            favo = favo.filter(f => f.id != peliculaIdToDelete && f.imdbID != peliculaIdToDelete); 
            
            localStorage.setItem('peliculaFavorita', JSON.stringify(favo));            
            
            const viewElement = event.target.closest('#tabla-favoritos-container').parentNode;
            favoritos(null, viewElement, null); 
        }
    });
}