$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/backend/api/cubiculo',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let tbyDatos = $('#tbyDatos');

            // Recorrer el arreglo de objetos JSON que se encuentra en la propiedad 'data' del objeto JSON 'data':
            data.forEach(function (e) {
                const tr = $('<tr></tr>');
                tr.append('<td>' + e.id + '</td>');
                tr.append('<td>' + e.nombre + '</td>');

                tbyDatos.append(tr);
            });
        },
        error: function (error) {
            console.log('error', error);
        }
    });
});
