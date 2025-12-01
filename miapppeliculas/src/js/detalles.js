export function detalles(id,view,url){

    return (fetch(url,{
        metdockerhod:'GET'
    })
    .then(res => res.json())
    .then(data => { 
        const pelicula = data.peliculas.filter(p=>p.id == id)[0];
      view.innerHTML = `
<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
            <div class="card bg-dark text-white shadow-lg p-3">
                
                <div class="row g-0">
                    
                    <div class="col-md-4">
                        <img src="${pelicula.url_caratula}" class="img-fluid rounded-start" alt="${pelicula.titulo}">
                    </div>
                    
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2>${pelicula.titulo}</h2>
                            <p>Género: ${pelicula.generos}</p>
                            <p>Calificación: ${pelicula.calificacion_imdb}</p>
                            <p>${pelicula.resumen}</p>
                            
                            <div class="mt-4">
                                <a href="#" class="btn btn-warning me-2">Volver</a>
                                <a href='#lista/${pelicula.id}'><button class="btn btn-outline-light"><i class="bi bi-plus-lg me-1"></i> Añadir a mi lista</button></a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
        </div>
    </div>
</div>
                        `;
    })
    .catch(err => {
      document.getElementById("view").innerHTML = `<p>Error cargando detalle: ${err}</p>`;
    }));
}

