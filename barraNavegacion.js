export function barraNavegacion() {
    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Parqueaderos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="parqueo.html" id="enlaceParqueo">Parqueo</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Datos
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="medios-pago.html">Medios pago</a></li>
                <li><a class="dropdown-item" href="cubiculos.html">Cubículos</a></li>
                <li><a class="dropdown-item" href="parqueaderos.html">Parqueaderos</a></li>
                <li><a class="dropdown-item" href="clientes.html">Clientes</a></li>
                <li><a class="dropdown-item" href="vehiculo-tipos.html">Vehículo - Tipos</a></li>
                <li><a class="dropdown-item" href="vehiculos.html">Vehículo</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="clientes-login.html">Clientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="cerrarSesion">Cerrar sesión</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="registro.html" id="enlaceRegistro">Registro</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="registro.html" id="enlaceRegistro">Registro</a>
            </li>
            </ul>
            <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        </div>
    </nav>
    `;
}

window.onload = function () {
    document.getElementById("cerrarSesion").onclick = cerrarSesion;

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    if (tipoUsuario) {
        document.querySelector("#enlaceParqueo").style.display = "block";
    } else {
        document.querySelector("#enlaceParqueo").style.display = "none";
    }
}

function cerrarSesion(event) {
    event.preventDefault();

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    localStorage.clear();

    if (tipoUsuario === "cliente") {
        window.location.href = "clientes-login.html";
    } else {
        window.location.href = "index.html";
    }
}
