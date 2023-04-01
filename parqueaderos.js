$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/backend/api/parqueadero",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let tbyDatos = $("#tbyDatos");

      // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
      data.forEach(function (e) {
        const tr = $("<tr></tr>");
        tr.append("<td>" + e.id + "</td>");
        tr.append("<td>" + e.nombre + "</td>");
        tr.append("<td>" + e.nit + "</td>");
        tr.append("<td>" + e.direccion + "</td>");
        tr.append("<td>" + e.telefono + "</td>");
        tr.append(
          `<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-operacion="editar" data-bs-entidad="Parqueadero" data-bs-id="${e.id}" data-bs-nombre="${e.nombre}" data-bs-nit="${e.nit}" data-bs-direccion="${e.direccion}" data-bs-telefono="${e.telefono}">Editar</button></td>`
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

    $("#frmGuardar").attr("operacion", button.getAttribute("data-bs-operacion"));

    if (operacion == "editar") {
      const id = button.getAttribute("data-bs-id");
      const entidad = button.getAttribute("data-bs-entidad");
      const nombre = button.getAttribute("data-bs-nombre");

      const titulo = exampleModal.querySelector(".modal-title");
      titulo.textContent = entidad;

      $("#id").val(id);
      $("#nombre").val(nombre);
      $("#nit").val(button.getAttribute("data-bs-nit"));
      $("#direccion").val(button.getAttribute("data-bs-direccion"));
      $("#telefono").val(button.getAttribute("data-bs-telefono"));
    } else {
        const titulo = exampleModal.querySelector(".modal-title");
        titulo.textContent = "Nuevo Parqueadero";
    
        $("#id").val("");
        $("#nombre").val("");
        $("#nit").val("");
        $("#direccion").val("");
        $("#telefono").val("");
    }
  });

  $("#frmGuardar").submit(function (e) {
    e.preventDefault();

    const operacion = $("#frmGuardar").attr("operacion");

    let id = operacion == "editar" ? $("#id").val() : 0;
    let nombre = $("#nombre").val();
    let nit = $("#nit").val();
    let direccion = $("#direccion").val();
    let telefono = $("#telefono").val();

    var settings = {
      url: "http://localhost:8080/backend/api/parqueadero",
      method: operacion == "editar" ? "PUT" : "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: id,
        nombre: nombre,
        nit: nit,
        direccion: direccion,
        telefono: telefono,
      }),
    };

    $.ajax(settings).done(function (response) {
      location.reload();
    });
  });
});
