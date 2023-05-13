$(document).ready(function () {
  $("#frmInicioSesionUsuario").submit(iniciarSesionUsuario);
});

function iniciarSesionUsuario(event) {
  event.preventDefault();
  let datos = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  $.ajax({
    url: "http://localhost:8080/backend/api/usuario/iniciar-sesion",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function (respuesta) {
      console.log(respuesta);
      if (respuesta.id !== 0) {
        localStorage.setItem("email", email);
        localStorage.setItem("usuarioId", respuesta.id);
        localStorage.setItem("tipoUsuario", "operario");
        window.location.href = "parqueo.html";
      } else {
        alert("Sus datos de inicio de sesión son incorrectos");
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
}
