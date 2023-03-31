$(document).ready(function () {
    // Realizar una consulta AJAX a la API con URL http://localhost:8080/backend/api/forma-pago:
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
                tr.append(`<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdicion" data-bs-id="${e.id}" data-bs-nombre="${e.nombre}">Editar</button></td>`);
                
                tbyDatos.append(tr);
            });
        },
        error: function (error) {
            console.log('error', error);
        }
    });
});
