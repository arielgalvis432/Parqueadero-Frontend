$(document).ready(function () {
  cargarParqueaderos();

  $("#frmCrearCliente").submit(crearCliente);
});

function crearCliente(e) {
  e.preventDefault();

  const documento = $("#documento").val();

  var settings = {
    url:
      "http://localhost:8080/backend/api/cliente/buscar-por-documento?documento=" +
      documento,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    if (!response) {
      const nombreCompleto = $("#nombreCompleto").val();
      const email = $("#email").val();
      const telefono = $("#telefono").val();
      const parqueaderoId = $("#parqueaderoId").val();

      var settings = {
        url: "http://localhost:8080/backend/api/cliente",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          nombreCompleto: nombreCompleto,
          documento: documento,
          email: email,
          telefono: telefono,
          parqueaderoId: parqueaderoId,
        }),
      };

      $.ajax(settings).done(function (response) {
        alert('Cliente creado correctamente');
        
        location.href = "clientes-login.html";
      });
    } else {
      alert("El cliente ya existe");
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
