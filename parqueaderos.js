$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/backend/api/forma-pago',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let tbyDatos = $('#tbyDatos');

            // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
            data.forEach(function (e) {
                const tr = $('<tr></tr>');
                tr.append('<td>' + e.id + '</td>');
                tr.append('<td>' + e.nombre + '</td>');
                tr.append(`<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-entidad="Medio de pago" data-bs-id="${e.id}" data-bs-nombre="${e.nombre}">Editar</button></td>`);

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

        const titulo = exampleModal.querySelector('.modal-title')
        titulo.textContent = entidad;

        $('#id').val(id);
        $('#nombre').val(nombre);
    });

    $('#frmGuardar').submit(function (e) {
        e.preventDefault();

        let id = $('#id').val();
        let nombre = $('#nombre').val();

        var settings = {
            "url": "http://localhost:8080/backend/api/forma-pago/",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": id,
                "nombre": nombre
            }),
        };

        $.ajax(settings).done(function (response) {
            location.reload();
        });
    });
});
