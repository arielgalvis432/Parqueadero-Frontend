$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/backend/api/vehiculo",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let tbyDatos = $("#tbyDatos");

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const tr = $("<tr></tr>");
        tr.append("<td>" + e.id + "</td>");
        tr.append("<td>" + e.placa + "</td>");
        tr.append("<td>" + e.marca + "</td>");
        tr.append("<td>" + e.color + "</td>");
        tr.append("<td>" + e.nombreCliente + "</td>");
        tr.append("<td>" + e.nombreTipoVehiculo + "</td>");
        tr.append(
          `<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-operacion="editar" data-bs-entidad="Cliente" data-bs-id="${e.id}" data-bs-nombre-completo="${e.nombreCompleto}" data-bs-documento="${e.documento}" data-bs-email="${e.email}" data-bs-telefono="${e.telefono}" data-bs-parquedero-id="${e.parqueaderoId}">Editar</button></td>`
        );

        tbyDatos.append(tr);
      });
    },
    error: function (error) {
      console.log("error", error);
    },
  });

  const exampleModal = document.getElementById("modalEdicion");
  exampleModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;

    const operacion = button.getAttribute("data-bs-operacion");

    $("#frmGuardar").attr(
      "operacion",
      button.getAttribute("data-bs-operacion")
    );

    if (operacion == "editar") {
      $("#nit").prop("disabled", true);
      const id = button.getAttribute("data-bs-id");
      const entidad = button.getAttribute("data-bs-entidad");
      const nombreCompleto = button.getAttribute("data-bs-nombre-completo");

      const titulo = exampleModal.querySelector(".modal-title");
      titulo.textContent = entidad;

      $("#id").val(id);
      $("#nombreCompleto").val(nombreCompleto);
      $("#documento").val(button.getAttribute("data-bs-documento"));
      $("#email").val(button.getAttribute("data-bs-email"));
      $("#telefono").val(button.getAttribute("data-bs-telefono"));
      
      cargarParqueaderos(button.getAttribute("data-bs-parquedero-id"));
    } else {
      const titulo = exampleModal.querySelector(".modal-title");
      titulo.textContent = "Nuevo Cliente";

      $("#id").val('');
      $("#nombreCompleto").val('');
      $("#documento").val('');
      $("#email").val('');
      $("#telefono").val('');

      cargarParqueaderos(0);
    }
  });

  $("#frmGuardar").submit(function (e) {
    e.preventDefault();

    const operacion = $("#frmGuardar").attr("operacion");

    let id = operacion == "editar" ? $("#id").val() : 0;
    const nombreCompleto = $("#nombreCompleto").val();
    const documento = $("#documento").val();
    const email = $("#email").val();
    const telefono = $("#telefono").val();
    const parqueaderoId = $("#parqueaderoId").val();

    var settings = {
      url: "http://localhost:8080/backend/api/cliente",
      method: operacion == "editar" ? "PUT" : "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: id,
        nombreCompleto: nombreCompleto,
        documento: documento,
        email: email,
        telefono: telefono,
        parqueaderoId: parqueaderoId,
      }),
    };

    $.ajax(settings).done(function (response) {
      location.reload();
    });
  });
});

function cargarParqueaderos(parqueaderoId) {
  $.ajax({
    url: "http://localhost:8080/backend/api/parqueadero",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const parqueaderos = $("#parqueaderoId");
      parqueaderos.empty();

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const option = $("<option></option>");
        option.val(e.id);
        option.text(e.nombre);
        if (e.id == parqueaderoId) {
          option.attr("selected", "selected");
        }
        parqueaderos.append(option);
      });
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}
