$(document).ready(function () {
  $("#frmInicioSesionCliente").submit(iniciarSesionCliente);
});

function iniciarSesionCliente(event) {
  event.preventDefault();
  let datos = {
    documento: $("#documento").val(),
    telefono: $("#celular").val(),
  };

  $.ajax({
    url: "http://localhost:8080/backend/api/cliente/iniciar-sesion",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(datos),
    success: function (respuesta) {
      console.log(respuesta);
      if (respuesta.id !== 0) {
        localStorage.setItem("documento", respuesta.documento);
        localStorage.setItem("clienteId", respuesta.id);
        localStorage.setItem("tipoUsuario", "cliente");
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
