
export function aboutViews(view) {

    return view.innerHTML = `
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
    return view; 
}