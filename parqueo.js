$(document).ready(function () {
  cargarParqueos(false);

  $('#btnBuscarParqueosPorCliente').click(function () {
    const documento = prompt('Ingrese el documento del cliente:');
    
    buscarParqueosPorClienteDocumento(documento);
  });

  $('#btnListarReservas').click(function () {
    cargarParqueos(true);
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

      const parqueo = JSON.parse(button.getAttribute("data-bs-parqueo"));
      console.log("🚀 ~ file: parqueo.js:34 ~ exampleModal.addEventListener ~ parqueo:", parqueo)

      $("#id").val(parqueo.id);
      $("#fechaInicio").val(parqueo.fechaInicio);
      $("#horaInicio").val(parqueo.horaInicio);
      $("#reserva").prop("checked", parqueo.reserva);

      cargarClientes(parqueo.clienteId);
      cargarVehiculos(parqueo.clienteId, parqueo.placaVehiculo);
      cargarCubiculos(parqueo.cubiculoId);
    } else {
      const titulo = exampleModal.querySelector(".modal-title");
      titulo.textContent = "Nuevo Parqueo";

      $("#id").val('');
      $('#fechaIncio').val('');
      $('#horaInicio').val('');

      $("#reserva").prop("checked", false);

      // Select clienteId sin seleccionar:
      $("#clienteId").val(0);
      $("#vehiculoId").val(0);
      $("#cubiculoId").val(0);

      cargarClientes(0);
      cargarCubiculos(0);
    }
  });

  const modalPago = document.getElementById("modalPago");
  modalPago.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;

    // Leer los datos de la propiedad data-bs-parqueo:
    const parqueo = JSON.parse(button.getAttribute("data-bs-parqueo"));

    // Crear un objeto moment con la fechaInicio y horaInicio:
    const fechaHoraInicio = moment(parqueo.fechaInicio + ' ' + parqueo.horaInicio, 'YYYY-MM-DD HH:mm:ss');
    console.log("🚀 ~ file: parqueo.js:73 ~ modalPago.addEventListener ~ fechaInicio:", fechaHoraInicio)
    
    const fechaHoraFinal = moment();

    const horas = fechaHoraFinal.diff(fechaHoraInicio, 'hours');
    console.log("🚀 ~ file: parqueo.js:78 ~ modalPago.addEventListener ~ horas:", horas)

    $('#totalPagar').val(horas * parqueo.tarifa);
    $('#totalTiempo').val(horas);
  });

  // Evento de cambio de selecci'on para el select de cliente:
  $("#clienteId").change(function () {
    const clienteId = $(this).val();
    cargarVehiculos(clienteId);
  });
});

function cargarVehiculos(clienteId, placa = null) {
  $.ajax({
    url: `http://localhost:8080/backend/api/vehiculo/buscar-por-cliente-id?clienteId=${clienteId}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let select = $("#vehiculoId");
      select.empty();

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const option = $("<option></option>");
        option.val(e.id);
        option.text(e.placa);
        select.append(option);
      });

      if (placa != null) {
        // Buscar por texto el option que tenga el valor de la placa:
        const option = select.find(`option:contains(${placa})`);
        option.prop("selected", true);
      }
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

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

function cargarCubiculos(cubiculoId) {
  $.ajax({
    url: "http://localhost:8080/backend/api/cubiculo",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      let select = $("#cubiculoId");
      select.empty();

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const option = $("<option></option>");
        option.val(e.id);
        option.text(e.nombre);
        select.append(option);
      });

      select.val(cubiculoId);
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

function buscarParqueosPorClienteDocumento(documento) {
  $.ajax({
    url: `http://localhost:8080/backend/api/parqueo/buscar-por-cliente-documento?documento=${documento}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let tbody = $("#tbyDatos");
      tbody.empty();

      if (data.length == 0) {
        alert("No se encontraron registros");
        return;
      }

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const tr = $("<tr></tr>");
        tr.append(`<td>${e.id}</td>`);
        tr.append(`<td>${e.fechaInicio}</td>`);
        tr.append(`<td>${e.horaInicio}</td>`);
        tr.append(`<td>${e.fechaFinal ? e.fechaFinal : 'N/D'}</td>`);
        tr.append(`<td>${e.horaFinal ? e.horaFinal : 'N/D'}</td>`);
        tr.append(`<td>${e.reserva == 1 ? "Sí" : "No"}</td>`);
        tr.append(`<td>${e.estadoReserva == 1 ? "Activa" : "No ocupada"}</td>`);
        tr.append(`<td>${e.placaVehiculo}</td>`);
        tr.append(`<td>${e.nombreCliente}</td>`);
        tr.append(`<td>${e.cubiculoId}</td>`);
        tr.append(`<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-parqueo='${JSON.stringify(e)}'>Editar</button></td>`);
        tr.append(`<td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalPago" data-bs-parqueo='${JSON.stringify(e)}'>Pagar</button></td>`);
        tbody.append(tr);
      });
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

function cargarParqueos(esReserva) {
  $.LoadingOverlay('show');
  $.ajax({
    url: `http://localhost:8080/backend/api/parqueo`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let tbody = $("#tbyDatos");
      tbody.empty();

      if (data.length == 0) {
        alert("No se encontraron registros");
        return;
      }

      if (esReserva) {
        data = data.filter((e) => e.reserva == 1);
      }

      data.forEach(function (e) {
          const tr = $("<tr></tr>");
          tr.append(`<td>${e.id}</td>`);
          tr.append(`<td>${e.fechaInicio}</td>`);
          tr.append(`<td>${e.horaInicio}</td>`);
          tr.append(`<td>${e.fechaFinal ? e.fechaFinal : 'N/D'}</td>`);
          tr.append(`<td>${e.horaFinal ? e.horaFinal : 'N/D'}</td>`);
          tr.append(`<td>${e.reserva == 1 ? "Sí" : "No"}</td>`);
          tr.append(`<td>${e.estadoReserva == 1 ? "Activa" : "No ocupada"}</td>`);
          tr.append(`<td>${e.placaVehiculo}</td>`);
          tr.append(`<td>${e.nombreCliente}</td>`);
          tr.append(`<td>${e.cubiculoId}</td>`);
          tr.append(`<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-operacion="editar" data-bs-parqueo='${JSON.stringify(e)}'>Editar</button> <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalPago" data-bs-parqueo='${JSON.stringify(e)}'>Pagar</button></td>`);

          tbody.append(tr);
      });

      $.LoadingOverlay('hide');
    },
    error: function (error) {
      console.log("error", error);
      $.LoadingOverlay('hide');
    },
  });
}
