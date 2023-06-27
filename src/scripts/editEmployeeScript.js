// Obtener una referencia al campo de selección
const idEquipoSelect = document.getElementById('idInputEquipo');

// Realizar una solicitud al endpoint para obtener los datos
fetch('/api/v1/equipo')
  .then(response => response.json())
  .then(data => {
    // Llenar el campo de selección con los nombres
    data.forEach(option => {
        const { value, label } = option; // Obtenemos el ID y el nombre
        const optionElement = document.createElement('option');
        optionElement.value = value; // Asignamos el ID como valor del elemento
        optionElement.textContent = label;
        idEquipoSelect.appendChild(optionElement);
    });
  })
  .catch(error => console.log(error));


// Obtener una referencia al campo de selección
const idEstadoSelect = document.getElementById('idInputEstado');
// Realizar una solicitud al endpoint para obtener los datos
fetch('/api/v1/estadoE')
  .then(response => response.json())
  .then(data => {
    // Llenar el campo de selección con los nombres
    data.forEach(option => {
        const { value, label } = option; // Obtenemos el ID y el nombre
        const optionElement = document.createElement('option');
        optionElement.value = value; // Asignamos el ID como valor del elemento
        optionElement.textContent = label;
        idEstadoSelect.appendChild(optionElement);
    });
  })
  .catch(error => console.log(error));

// Obtener una referencia al campo de selección
const idPosicionSelect = document.getElementById('idInputPosicion');

// Realizar una solicitud al endpoint para obtener los datos
fetch('/api/v1/posicion')
  .then(response => response.json())
  .then(data => {
    // Llenar el campo de selección con los nombres
    data.forEach(option => {
      const { value, label } = option; // Obtenemos el ID y el nombre
      const optionElement = document.createElement('option');
      optionElement.value = value; // Asignamos el ID como valor del elemento
      optionElement.textContent = label;
      idPosicionSelect.appendChild(optionElement);
    });
  })
  .catch(error => console.log(error));

// Función para formatear la fecha en formato 'YYYY-MM-DD'
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cod_empleado = urlParams.get('cod_empleado');

  if (cod_empleado) {
    const fetchEmpleado = fetch(`/api/v1/empleado/${cod_empleado}`);
    const fetchEquipo = fetch('/api/v1/equipo');
    const fetchEstado = fetch('/api/v1/estadoE');
    const fetchPosicion = fetch('/api/v1/posicion');

    Promise.all([fetchEmpleado, fetchEquipo, fetchEstado, fetchPosicion])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        const empleado = data[0];

        // Llenar el formulario con los datos del empleado
        const form = document.querySelector('form');
        const nombreInput = document.getElementById('nombreInput');
        const apellidoInput = document.getElementById('apellidoInput');
        const edadInput = document.getElementById('edadInput');
        const codInput = document.getElementById('codInput');
        const telInput = document.getElementById('telInput');
        const ingresoInput = document.getElementById('ingresoInput');
        const idInputEquipo = document.getElementById('idInputEquipo');
        const idInputPosicion = document.getElementById('idInputPosicion');
        const idInputEstado = document.getElementById('idInputEstado');
        const idInputGenero = document.getElementById('idInputGenero');
        const mesVacacionInput = document.getElementById('mesVacacionInput');
        const fechaEvaluacionInput = document.getElementById('fechaEvaluacionInput');
        const fechaInicioVacacionInput = document.getElementById('fechaInicioVacacionInput');
        const fechaFinalVacacionInput = document.getElementById('fechaFinalVacacionInput');

        nombreInput.value = empleado.nombre;
        apellidoInput.value = empleado.apellido;
        edadInput.value = empleado.edad;
        codInput.value = empleado.cod_empleado;
        telInput.value = empleado.telefono;
        ingresoInput.value = formatDate(empleado.fecha_de_ingreso); // Suponiendo que tienes la función formatDate definida
        idInputEquipo.value = empleado.id_equipo;
        idInputPosicion.value = empleado.id_posicion;
        idInputEstado.value = empleado.id_estado;
        idInputGenero.value = empleado.genero_sigla;
        mesVacacionInput.value = empleado.mes_vacacion;
        fechaEvaluacionInput.value = formatDate(empleado.fecha_eval_prueba);
        fechaInicioVacacionInput.value = formatDate(empleado.fecha_inicio_vacaciones);
        fechaFinalVacacionInput.value = formatDate(empleado.fecha_final_vacaciones);

        // Manejar el evento de envío del formulario
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          // Aquí puedes realizar la lógica para actualizar los datos del empleado

          // Obtener los valores actualizados del formulario
          const updatedEmpleado = {
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            edad: parseInt(edadInput.value),
            newCodEmpleado: codInput.value,
            telefono: telInput.value,
            fecha_de_ingreso: ingresoInput.value,
            id_equipo: parseInt(idInputEquipo.value),
            id_posicion: parseInt(idInputPosicion.value),
            id_estado: parseInt(idInputEstado.value),
            genero_sigla: idInputGenero.value,
            mes_vacacion: parseInt(mesVacacionInput.value),
            fecha_eval_prueba: fechaEvaluacionInput.value,
            fecha_inicio_vacaciones: fechaInicioVacacionInput.value,
            fecha_final_vacaciones: fechaFinalVacacionInput.value
          };

          // Realizar la solicitud PATCH al endpoint para actualizar los datos del empleado
          fetch(`/api/v1/empleado/${cod_empleado}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmpleado)
          })
          .then(response => {
            if (response.ok) {
              console.log('Empleado actualizado con éxito');
              // Aquí puedes realizar alguna acción adicional, como redirigir al usuario a otra página
               alert('¡Empleado actualizado exitosamente!');
            } else {
              console.log('Error al actualizar el empleado:', result.message);
              let errorMessage = result.sqlMessage || result.error || 'Error desconocido';
              alert(`Error al actualizar el empleado: ${errorMessage}`);
            }
          })
          .catch(error => console.log(error));
        });
      })
      .catch(error => console.log(error));
  }
});