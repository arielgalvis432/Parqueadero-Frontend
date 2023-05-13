$(document).ready(function () {

  $("#frmCrearOperario").submit(crearUsuario);
});

function crearUsuario(e) {
  e.preventDefault();

  const email = $("#email").val();

  var settings = {
    url:
      "http://localhost:8080/backend/api/usuario/buscar-por-email?email=" +
      email,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    if (!response) {
      const nombreCompleto = $("#nombreCompleto").val();
      const password = $("#password").val();
      const email = $("#email").val();
      const telefono = $("#telefono").val();

      var settings = {
        url: "http://localhost:8080/backend/api/usuario",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          nombreCompleto: nombreCompleto,
          password: password,
          email: email,
          telefono: telefono,
          rolId: 1,
          parqueaderoId: 1
        }),
      };

      $.ajax(settings).done(function (response) {
        alert('Usuario creado correctamente');
        
        location.href = "usuarios-login.html";
      });
    } else {
      alert("El usuario ya existe");
    }
  });
}
