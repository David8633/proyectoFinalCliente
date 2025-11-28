function navbar() {
  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">

        <a class="navbar-brand" href="#/">MiAppPelículas</a>

        <!-- Botón hamburguesa que faltaba -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#/">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/series">Series</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/peliculas">Películas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/lista">Mi Lista</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  `;
}

export { navbar };
