// Obtener una referencia al campo de selección
const idEquipoSelect = document.getElementById('idInputEquipo');

// Realizar una solicitud al endpoint para obtener los datos
fetch('/api/v1/equipo')
  .then(response => response.json())
  .then(data => {
    // Llenar el campo de selección con los nombres
    data.forEach(option => {
      const { label } = option; // Solo obtenemos el nombre (label)
      const optionElement = document.createElement('option');
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
      const { label } = option; // Solo obtenemos el nombre (label)
      const optionElement = document.createElement('option');
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
// Obtener referencias a los elementos del formulario
const form = document.querySelector('form');
const codInput = document.getElementById('codInput');
const idInputEquipo = document.getElementById('idInputEquipo');
const idInputPosicion = document.getElementById('idInputPosicion');
const idInputEstado = document.getElementById('idInputEstado');
const nombreInput = document.getElementById('nombreInput');
const apellidoInput = document.getElementById('apellidoInput');
const edadInput = document.getElementById('edadInput');
const ingresoInput = document.getElementById('ingresoInput');
const idInputGenero = document.getElementById('idInputGenero');
const telInput = document.getElementById('telInput');

// Función para realizar la solicitud de POST
const postEmpleado = async () => {
  try {
    // Obtener el nombre de la posición seleccionada
    const posicionNombre = idInputPosicion.options[idInputPosicion.selectedIndex].text;
    const estadoNombre = idInputEstado.options[idInputEstado.selectedIndex].text;
    const equipoNombre = idInputEquipo.options[idInputEquipo.selectedIndex].text;

    // Realizar una solicitud para obtener el ID correspondiente al nombre de la posición
    const posicionResponse = await fetch(`/api/v1/posicion/${posicionNombre}`);
    const posicionData = await posicionResponse.json();
    const estadoResponse = await fetch(`/api/v1/estadoE/${estadoNombre}`);
    const estadoData = await estadoResponse.json(); 
    const equipoResponse = await fetch(`/api/v1/equipo/${equipoNombre}`);
    const equipoData = await equipoResponse.json();

    // Verificar si se obtuvo el ID de la posición correctamente

    /*if (!posicionData.success) {
      console.log(nombre);
      console.log(posicionData);
      console.log('Error al obtener el ID de la posición:', posicionData.message);
      return;
    }*/

    // Obtener el ID de la posición
    const idPosicion = posicionData.value;
    console.log(idPosicion)
    console.log(posicionData)
    const idEstado = estadoData.value;
    console.log(idEstado);
    console.log(estadoData);
    const idEquipo = equipoData.value;
    console.log(idEquipo);
    console.log(equipoData);
    // Crear el objeto de datos a enviar en la solicitud con el ID de la posición y los demás valores del formulario
    const data = {
      cod_empleado: codInput.value,
      id_posicion: idPosicion,
      id_equipo: idEquipo,
      id_estado: idEstado,
      nombre: nombreInput.value,
      apellido: apellidoInput.value,
      edad: parseInt(edadInput.value),
      fecha_de_ingreso: ingresoInput.value,
      genero_sigla: idInputGenero.value,
      telefono: parseInt(telInput.value),
    };

    // Realizar la solicitud de POST a /api/v1/empleado
    const response = await fetch('/api/v1/empleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Manejar la respuesta de la solicitud
    const result = await response.json();
    if (result.success) {
      console.log('Empleado creado exitosamente:', result.employee);
      // Aquí puedes realizar cualquier acción adicional después de crear el empleado
      alert('¡Empleado creado exitosamente!');
    } else {
      console.log('Error al crear el empleado:', result.message);
      let errorMessage = result.sqlMessage || result.error || 'Error desconocido';
      // Mostrar el mensaje de error en la alerta
      alert(`Error al crear el empleado: ${errorMessage}`);
    }
  } catch (error) {
    console.log('Error en la solicitud de POST:', error);
  }
};

// Escuchar el evento de envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío del formulario por defecto
  postEmpleado(); // Realizar la solicitud de POST
});
