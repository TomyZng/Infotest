function handleNombreFilter(e, rows) { //e variable being event in this case searching name and rows being the data
    const value = e.target.value.toLowerCase(); //transform the e event, when user add some text in the search bar, into lowercase

    rows.forEach(row => {
      const nombreCell = row.querySelector("td:nth-child(2)"); //Select the second column in this case nombre
      const nombre = nombreCell.textContent.toLowerCase(); //lower case for clarity
      const isVisible = nombre.includes(value); //only show the value with the user input
  
      row.style.display = isVisible ? "" : "none"; //if value = rows then show data else hide it
    });
  }
  
  function handleIDFilter(e, rows) {
    const value = e.target.value.toLowerCase();
  
    rows.forEach(row => {
      const idCell = row.querySelector("td:nth-child(1)");
      const id = idCell.textContent.toLowerCase();
      const isVisible = id.includes(value);
  
      row.style.display = isVisible ? "" : "none";
    });
  }
  
  function deleteRow(id) {
    fetch(`/api/uen/${id}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          const row = document.getElementById(`row-${id}`);
          row.remove();
        } else {
          throw new Error(`Error al borrar los datos de la API: ${response.status}`);
        }
      })
      .catch(error => console.error(error));
  }

  function updateUen(id, nombre) {
    const data = {
      nombre: nombre
    };
  
    fetch(`/api/uen/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json" //Read data as json
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json()) //Send data as Json
      .then(updatedUen => {
        console.log(updatedUen); //Check input in console, testing
        location.reload(); //Refresh per edit
      })
      .catch(error => console.error(error));
  }
  
  function editRow(id) {
    const newName = prompt("Ingrese el nuevo nombre:"); //prompt as a interface for test
    if (newName) {
      updateUen(id, newName);
    }
  }
  
  function fetchData() {
    const searchInputNombre = document.getElementById("filtroNombre");
    const searchInputID = document.getElementById("filtroID");
    let rows = Array.from(document.querySelectorAll("#data tr"));
  
    searchInputNombre.addEventListener("input", function(e) {
      handleNombreFilter(e, rows);
    });
  
    searchInputID.addEventListener("input", function(e) {
      handleIDFilter(e, rows);
    });
  
    fetch('/api/uen')
      .then(response => response.json())
      .then(data => {
        const dataContainer = document.getElementById("data");
        dataContainer.innerHTML = ""; // Limpiar los datos existentes antes de agregar nuevos
        rows = [];
  
        data.forEach(item => {
          const row = document.createElement("tr");
          const idCell = document.createElement("td");
          const nombreCell = document.createElement("td");
          const actionsCell = document.createElement("td");
          const editCell = document.createElement("td");
  
          idCell.textContent = item.id_uen;
          nombreCell.textContent = item.nombre;
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Borrar";
          deleteButton.setAttribute("data-id", item.id_uen);
          deleteButton.addEventListener("click", function() { //On click get the data-id and delete the data with that id
            const id = this.getAttribute("data-id");
            deleteRow(id);
          });

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.setAttribute("data-id", item.id_uen);
          editButton.addEventListener("click", function(){
            const id = this.getAttribute("data-id");
            editRow(id);
          })

  
          actionsCell.appendChild(deleteButton);
          editCell.appendChild(editButton);
  
          row.appendChild(idCell);
          row.appendChild(nombreCell);
          row.appendChild(actionsCell);
          row.appendChild(editCell);

          row.id = `row-${item.id_uen}`;
  
          dataContainer.appendChild(row);
          rows.push(row); //push data per filter
        });
      })
      .catch(error => console.error('Error al obtener los datos de la API:', error));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const selectOrden = document.getElementById("ordenSelect");
  
    const currentOrden = selectOrden.value;
    fetchData(currentOrden);
  });