let urlCaratula = 'http://localhost:3000/caratulas';

/**
 * Fetches cover image URLs and populates a Bootstrap carousel.
 * Assumes 'view' is the .carousel-inner container element.
 * * @param {HTMLElement} view The container element (e.g., the .carousel-inner div)
 */
export function aboutViews(view) {

    // Ensure the container element is provided
    if (!view) {
        console.error("Error: View element is missing.");
        return;
    }

    return fetch(urlCaratula)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            view.innerHTML = `
                <div class="p-5 mb-4 rounded-3 border/20">
                    <div class="container-fluid py-5">
                        <h1 class="display-5 fw-bold text-primary">Sobre Nosotros</h1>
                        <p class="col-md-10 fs-4 text-secondary">
                            Somos un equipo apasionado por el diseño digital y la cultura pop. 
                            Nuestra plataforma se dedica a recopilar y mostrar las mejores películas, celebrando el arte detrás de cada pieza. Creemos que la 
                            presentación visual es tan importante como el contenido mismo.
                        </p>
                    </div>
                </div>
            `;
        })
        .catch(err => console.error("Error cargando carátulas:", err));
}