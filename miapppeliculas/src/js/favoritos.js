export function favoritos(id, view, url) {
    const storedFavorites = localStorage.getItem('peliculaFavorita');
    let peliculaFavorita = storedFavorites ? JSON.parse(storedFavorites) : [];

    fetch(`${url}/${id}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Obtenemos un identificador único para la película
        const peliculaId = data.imdbID || id;
        
        // 1. COMPROBACIÓN CLAVE: Usamos .some() para verificar si ya existe un favorito con ese ID
        const yaExiste = peliculaFavorita.some(favorito => favorito.imdbID === peliculaId || favorito.id === peliculaId);

        // Limpiar la vista solo si no hay error
        view.innerHTML = "";

        if (data && !yaExiste) {
            // 2. Si la película es válida y NO existe, la añadimos
            peliculaFavorita.push(data);
            
            // 3. Guardamos la nueva lista en localStorage
            localStorage.setItem('peliculaFavorita', JSON.stringify(peliculaFavorita));
            
            // Opcional: Mensaje de éxito (temporal)
            console.log(`Película con ID ${peliculaId} añadida a favoritos.`);

        } else if (yaExiste) {
            // 4. Si YA EXISTE, mostramos un mensaje de error/advertencia en la vista
            view.innerHTML = `<p class="alert alert-warning">⚠️ Esta película ya está guardada en tus favoritos.</p>`;
            // NOTA: Si ya existe, no volvemos a llamar a localStorage.setItem aquí.
            
        } else {
            // Manejo de caso donde 'data' es nulo o inválido
             view.innerHTML = `<p class="alert alert-danger">Error: No se pudo obtener la información de la película.</p>`;
        }
        
        // --- Renderizado de la tabla (Siempre se renderiza la lista actual) ---
        
        const favRows = peliculaFavorita.map(favorito => {
            // Usamos el ID del favorito para el botón de eliminar
            const currentId = favorito.imdbID || favorito.id;
            return `
                <tr>
                    <td class="text-sm rounded-tl-lg">${favorito.titulo || 'N/A'}</td>
                    <td class="text-sm bi bi-star-fill"> ${favorito.calificacion_imdb || 'N/A'}/10</td>
                    <td class="text-sm">${favorito.ano_lanzamiento || 'N/A'}</td>
                    <td class="text-sm">${favorito.generos || 'N/A'}</td>
                    <td class="text-sm rounded-tr-lg">
                        <button id='remove' class="btn btn-sm btn-danger btn-delete shadow-sm" data-id="${currentId}">Eliminar</button>
                    </td>
                </tr>
            `;
        }).join('');

        // Solo actualizamos la tabla si realmente hay favoritos
        if (peliculaFavorita.length > 0) {
            view.innerHTML += `<div class="table-responsive rounded-lg border mt-3">
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
    })
    .catch(error => {
        // En caso de error de la API
        console.error("Error al obtener la película:", error);
        view.innerHTML = `<p class="alert alert-danger">Error al cargar la película: ${error.message}</p>`;
    });
}


