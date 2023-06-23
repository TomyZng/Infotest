function formatDate(date) {
  const isoDate = new Date(date).toISOString();
  return isoDate.split("T")[0];
}

function handleNombreFilter() {
  const filtroNombreInput = document.getElementById('filtroNombre');
  const tableRows = document.querySelectorAll('.table tbody tr');

  filtroNombreInput.addEventListener('input', () => {
    const filtro = filtroNombreInput.value.toLowerCase();

    tableRows.forEach(row => {
      const nombreCell = row.querySelector('td:nth-child(5)'); // Select the column containing the nombre
      const nombre = nombreCell.textContent.toLowerCase();

      if (nombre.includes(filtro)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

function fetchData() {
  const table = document.querySelector('.table tbody');

  fetch('/api/v1/empleado')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then(data => {
      table.innerHTML = '';

      // Fetch the posicion data to map the id_posicion to its corresponding name
      fetch('/api/v1/posicion')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la solicitud de Posicion');
          }
        })
        .then(posicionData => {
          const posicionMap = new Map();

          // Create a map with id_posicion as the key and the corresponding name as the value
          posicionData.forEach(posicion => {
            posicionMap.set(posicion.value, posicion.label);
          });

          // Fetch the equipo data to map the id_equipo to its corresponding name
          fetch('/api/v1/equipo')
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Error en la solicitud de Equipo');
              }
            })
            .then(equipoData => {
              const equipoMap = new Map();

              // Create a map with id_equipo as the key and the corresponding name as the value
              equipoData.forEach(equipo => {
                equipoMap.set(equipo.value, equipo.label);
              });

              // Fetch the estado data to map the id_estado to its corresponding name
              fetch('/api/v1/estadoE')
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Error en la solicitud de Estado');
                  }
                })
                .then(estadoData => {
                  const estadoMap = new Map();

                  // Create a map with id_estado as the key and the corresponding name as the value
                  estadoData.forEach(estado => {
                    estadoMap.set(estado.value, estado.label);
                  });

                  // Iterate through the employee data
                  data.forEach(empleado => {
                    const row = document.createElement('tr');

                    const codigoCell = document.createElement('td');
                    codigoCell.textContent = empleado.cod_empleado;
                    row.appendChild(codigoCell);

                    const posicionCell = document.createElement('td');
                    const posicionName = posicionMap.get(empleado.id_posicion); // Get the corresponding name from the map
                    posicionCell.textContent = posicionName || empleado.id_posicion;
                    row.appendChild(posicionCell);

                    const equipoCell = document.createElement('td');
                    const equipoName = equipoMap.get(empleado.id_equipo); // Get the corresponding name from the map
                    equipoCell.textContent = equipoName || empleado.id_equipo;
                    row.appendChild(equipoCell);

                    const estadoCell = document.createElement('td');
                    const estadoName = estadoMap.get(empleado.id_estado); // Get the corresponding name from the map
                    estadoCell.textContent = estadoName || empleado.id_estado;
                    row.appendChild(estadoCell);

                    const nombreCell = document.createElement('td');
                    nombreCell.textContent = empleado.nombre;
                    row.appendChild(nombreCell);

                    const apellidoCell = document.createElement('td');
                    apellidoCell.textContent = empleado.apellido;
                    row.appendChild(apellidoCell);

                    const edadCell = document.createElement('td');
                    edadCell.textContent = empleado.edad;
                    row.appendChild(edadCell);

                    const fechaIngresoCell = document.createElement('td');
                    fechaIngresoCell.textContent = formatDate(empleado.fecha_de_ingreso); // Formatear la fecha de ingreso
                    row.appendChild(fechaIngresoCell);

                    const generoCell = document.createElement('td');
                    generoCell.textContent = empleado.genero_sigla;
                    row.appendChild(generoCell);

                    const fechaEvaluacionCell = document.createElement('td');
                    fechaEvaluacionCell.textContent = formatDate(empleado.fecha_eval_prueba);
                    row.appendChild(fechaEvaluacionCell);

                    const mesVacacionCell = document.createElement('td');
                    mesVacacionCell.textContent = empleado.mes_vacacion;
                    row.appendChild(mesVacacionCell);

                    const telefonoCell = document.createElement('td');
                    telefonoCell.textContent = empleado.telefono;
                    row.appendChild(telefonoCell);

                    const fechaInicioVacacionesCell = document.createElement('td');
                    fechaInicioVacacionesCell.textContent = formatDate(empleado.fecha_inicio_vacaciones); // Formatear la fecha de inicio de vacaciones
                    row.appendChild(fechaInicioVacacionesCell);

                    const fechaFinalVacacionesCell = document.createElement('td');
                    fechaFinalVacacionesCell.textContent = formatDate(empleado.fecha_final_vacaciones);
                    row.appendChild(fechaFinalVacacionesCell);

                    const editarCell = document.createElement('td');
                    editarCell.innerHTML = '<a href="#">Editar</a>';
                    row.appendChild(editarCell);

                    const borrarCell = document.createElement('td');
                    borrarCell.innerHTML = '<a href="#">Borrar</a>';
                    row.appendChild(borrarCell);

                    table.appendChild(row);
                  });

                  handleNombreFilter();
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

document.addEventListener('DOMContentLoaded', fetchData);
