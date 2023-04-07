$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/backend/api/vehiculo-tipo',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let tbyDatos = $('#tbyDatos');

            // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
            data.forEach(function (e) {
                const tr = $('<tr></tr>');
                tr.append('<td>' + e.id + '</td>');
                tr.append('<td>' + e.nombre + '</td>');
                tr.append('<td>' + e.tarifa + '</td>');
                tr.append(`<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-entidad="Vehículo - Tipo" data-bs-id="${e.id}" data-bs-nombre="${e.nombre}" data-bs-tarifa="${e.tarifa}">Editar</button></td>`);

                tbyDatos.append(tr);
            });
        },
        error: function (error) {
            console.log('error', error);
        }
    });

    const exampleModal = document.getElementById('modalEdicion')
    exampleModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget

        const id = button.getAttribute('data-bs-id');
        const entidad = button.getAttribute('data-bs-entidad');
        const nombre = button.getAttribute('data-bs-nombre');
        const tarifa = button.getAttribute('data-bs-tarifa');

        const titulo = exampleModal.querySelector('.modal-title')
        titulo.textContent = entidad;

        $('#id').val(id);
        $('#nombre').val(nombre);
        $('#tarifa').val(tarifa);
    });

    $('#frmGuardar').submit(function (e) {
        e.preventDefault();

        const id = $('#id').val();
        const nombre = $('#nombre').val();
        const tarifa = $('#tarifa').val();

        var settings = {
            "url": "http://localhost:8080/backend/api/vehiculo-tipo",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": id,
                "nombre": nombre,
                "tarifa": tarifa
            }),
        };

        $.ajax(settings).done(function (response) {
            location.reload();
        });
    });
});
