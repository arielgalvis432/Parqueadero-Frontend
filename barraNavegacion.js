export function barraNavegacion() {
    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Parqueaderos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li classsss="nav-item">
                <a class="nav-link" href="parqueo.html" id="enlaceParqueo">Parqueo</a>
            </li>
            <li class="nav-item dropdown" id="menuDatos">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Datos
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item protegido" href="medios-pago.html">Medios pago</a></li>
                <li><a class="dropdown-item protegido" href="cubiculos.html">Cubículos</a></li>
                <li><a class="dropdown-item protegido" href="parqueaderos.html">Parqueaderos</a></li>
                <li><a class="dropdown-item protegido" href="clientes.html">Clientes</a></li>
                <li><a class="dropdown-item protegido" href="vehiculo-tipos.html">Vehículo - Tipos</a></li>
                <li><a class="dropdown-item" href="vehiculos.html">Vehículo</a></li>
                <li><a class="dropdown-item" href="cubiculos-disponibles.html">Cubículos disponibles</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link acceso" href="clientes-login.html"> Acceso clientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link acceso" href="usuarios-login.html"> Acceso usuarios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="cerrarSesion">Cerrar sesión</a>
            </li>
            <li class="nav-item">
                <a class="nav-link registro" href="registro.html" id="enlaceRegistro">Registro clientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link registro" href="registro-operarios.html" id="enlaceRegistro-operarios">Registro operarios</a>
            </li>
            </ul>
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
        $(".acceso").hide();
        $(".registro").hide();
        $("#cerrarSesion").show();
    } else {
        document.querySelector("#enlaceParqueo").style.display = "none";
        document.querySelector("#menuDatos").style.display = "block";
        $(".acceso").show();
        $(".registro").show();
        $("#cerrarSesion").hide();
    }

    if (tipoUsuario === "cliente") {
        $(".protegido").hide();
    } else if (tipoUsuario === "operario") {
        $(".protegido").show();
    } else {
        $(".protegido").hide();
    }
}

function cerrarSesion(event) {
    event.preventDefault();

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    localStorage.clear();

    if (tipoUsuario === "cliente") {
        window.location.href = "clientes-login.html";
    } else {
        window.location.href = "usuarios-login.html";
    }
}
