$(document).ready(function () {
  cargarParqueaderos();

  $("#frmCrearCliente").submit(crearUsuario);
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
          parqueaderoId: parqueaderoId,
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

function cargarParqueaderos() {
  $.ajax({
    url: "http://localhost:8080/backend/api/parqueadero",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const parqueaderos = $("#parqueaderoId");
      parqueaderos.empty();

      data.forEach(function (e) {
        const option = $("<option></option>");
        option.val(e.id);
        option.text(e.nombre);
        parqueaderos.append(option);
      });

      parqueaderos.val(parqueaderos.children()[0].value);
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}
