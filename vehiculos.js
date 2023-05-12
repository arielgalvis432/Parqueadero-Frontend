$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/backend/api/vehiculo",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let tbyDatos = $("#tbyDatos");

      let clienteId = localStorage.getItem("clienteId");

      if (clienteId) {
        clienteId = parseInt(clienteId);
        data = data.filter((e) => e.clienteId == clienteId);
      }

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
          `<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-operacion="editar" data-bs-entidad="Cliente" data-bs-id="${e.id}" data-bs-placa="${e.placa}" data-bs-marca="${e.marca}" data-bs-color="${e.color}" data-bs-cliente-id="${e.clienteId}" data-bs-tipo-vehiculo-id="${e.tipoVehiculoId}">Editar</button></td>`
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

      const titulo = exampleModal.querySelector(".modal-title");
      titulo.textContent = entidad;

      $("#id").val(id);
      $("#placa").val(button.getAttribute("data-bs-placa"));
      $("#marca").val(button.getAttribute("data-bs-marca"));
      $("#color").val(button.getAttribute("data-bs-color"));
      $("#clienteId").val(button.getAttribute("data-bs-cliente-id"));
      $("#tipoVehiculoId").val(button.getAttribute("data-bs-tipo-vehiculo-id"));
      
      cargarClientes(button.getAttribute("data-bs-cliente-id"));
      cargarTipoVehiculos(button.getAttribute("data-bs-tipo-vehiculo-id"));
    } else {
      const titulo = exampleModal.querySelector(".modal-title");
      titulo.textContent = "Nuevo Cliente";

      $("#id").val('');
      $("#placa").val('');
      $("#marca").val('');
      $("#color").val('');
      $("#clienteId").val('');
      $("#tipoVehiculoId").val('');

      let clienteId = localStorage.getItem("clienteId");

      if (clienteId) {
        clienteId = parseInt(clienteId);
        cargarClientes(clienteId);

        $("#clienteId").prop("disabled", true);
      } else {
        cargarClientes(0);
      }
      cargarTipoVehiculos(0);
    }
  });

  $("#frmGuardar").submit(function (e) {
    e.preventDefault();

    const operacion = $("#frmGuardar").attr("operacion");

    let id = operacion == "editar" ? $("#id").val() : 0;
    const placa = $("#placa").val();
    const marca = $("#marca").val();
    const color = $("#color").val();
    const clienteId = $("#clienteId").val();
    const vehiculoTipoId = $("#vehiculoTipoId").val();

    console.log(id, placa, marca, color, clienteId, vehiculoTipoId);

    var settings = {
      url: "http://localhost:8080/backend/api/vehiculo",
      method: operacion == "editar" ? "PUT" : "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: id,
        placa,
        marca,
        color,
        clienteId,
        tipoVehiculoId: vehiculoTipoId,
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      location.reload();
    });
  });
});

function cargarClientes(clienteId) {
  $.ajax({
    url: "http://localhost:8080/backend/api/cliente",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let select = $("#clienteId");
      select.empty();

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const option = $("<option></option>");
        option.val(e.id);
        option.text(e.nombreCompleto);
        select.append(option);
      });

      select.val(clienteId);
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

function cargarTipoVehiculos(tipoVehiculoId) {
  $.ajax({
    url: "http://localhost:8080/backend/api/vehiculo-tipo",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let select = $("#vehiculoTipoId");
      select.empty();

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const option = $("<option></option>");
        option.val(e.id);
        option.text(e.nombre);
        select.append(option);
      });

      select.val(tipoVehiculoId);
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}