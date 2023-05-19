$(document).ready(function () {
  cargarCubiculos();
});

function cargarCubiculos() {
  $.ajax({
    url: "http://localhost:8080/backend/api/cubiculo",
    type: "GET",
    dataType: "json",
    success: function (cubiculos) {
      $.ajax({
        url: "http://localhost:8080/backend/api/cubiculo/ocupados",
        type: "GET",
        dataType: "json",
        success: function (cubiculosOcupados) {
          const tblCubiculos = $('#tblCubiculos tbody');
          console.log(tblCubiculos);
          let tr = undefined;
          cubiculos.forEach((c, i) => {
            if (i % 10 === 0) {
              tr = $('<tr></tr>');
              tblCubiculos.append(tr);
            }

            const td = $('<td></td>');
            td.text(c.nombre);
            td.css('color', 'white');

            td.css('background-color', cubiculosOcupados.find(c0 => c0.id === c.id && !c0.fechaFinal) ? 'red' : 'green');
            
            tr.append(td);

            console.log('c', c);

          });
        },
        error: function (error) {
          console.log("error", error);
        },
      });
    },
    error: function (error) {
      console.log("error", error);
    },
  });
}

