const abrir = document.getElementById("abrirModal");
const modal = document.getElementById("miModal");
const cerrar = document.getElementById("cerrarModal");

// Modal de editar
const modalEditar = document.getElementById("editModal");
const cerrarEditar = document.getElementById("closeEditModal");

abrir.onclick = () => modal.style.display = "block";
cerrar.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// Evento para agregar el producto al inventario
document.getElementById("formularioProducto").addEventListener("submit", function (e) {
    e.preventDefault();  // Evita que el formulario recargue la página

    // Obtén los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const imagen = document.getElementById("imagen").value;
    const categoria = document.getElementById("categoria").value;
    const cantidad = document.getElementById("cantidad").value;
    const tipoZapato = document.getElementById("tipoZapato").value;
    const tallas = document.getElementById("tallas").value;
    const colores = document.getElementById("colores").value;

    // Crear una nueva fila en la tabla
    const tabla = document.getElementById("inventory-table").getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Insertar celdas con los valores obtenidos
    nuevaFila.insertCell(0).textContent = cantidad;  // Cantidad
    nuevaFila.insertCell(1).innerHTML = `<img src="${imagen}" class="product-img">`;  // Imagen
    nuevaFila.insertCell(2).textContent = nombre;  // Nombre
    nuevaFila.insertCell(3).textContent = categoria;  // Categoría
    nuevaFila.insertCell(4).textContent = tipoZapato;  // Tipo de zapato
    nuevaFila.insertCell(5).textContent = colores;  // Colores
    nuevaFila.insertCell(6).textContent = tallas;  // Tallas

    // Crear la celda de acciones y agregar el botón de editar
    const accionesCelda = nuevaFila.insertCell(7);
    const botonEditar = document.createElement("button");
    botonEditar.classList.add("edit-btn");
    botonEditar.textContent = "Editar";
    botonEditar.setAttribute("data-id", tabla.rows.length);  // Usar el número de filas como ID
    botonEditar.onclick = function() {
      editProduct(botonEditar);  // Llamar la función editProduct al hacer clic
    };
    accionesCelda.appendChild(botonEditar);  // Agregar el botón a la celda

    // Cerrar el modal después de agregar el producto
    modal.style.display = "none";

    // Limpiar el formulario
    document.getElementById("formularioProducto").reset();
});

// Mostrar el modal de edición y cargar datos
function editProduct(button) {
  const productId = button.getAttribute('data-id');
  const productRow = document.getElementById('product' + productId);

  document.getElementById('editNombre').value = productRow.cells[2].textContent;
  document.getElementById('editImagen').value = productRow.cells[1].getElementsByTagName('img')[0].src;
  document.getElementById('editCategoria').value = productRow.cells[3].textContent;
  document.getElementById('editCantidad').value = productRow.cells[0].textContent;
  document.getElementById('editTipoZapato').value = productRow.cells[4].textContent;
  document.getElementById('editTallas').value = productRow.cells[6].textContent;
  document.getElementById('editColores').value = productRow.cells[5].textContent;

  document.getElementById('editModal').style.display = 'block';
  document.getElementById('editForm').setAttribute('data-id', productId);
}

// Guardar los cambios y actualizar la tabla
document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const productId = document.getElementById('editForm').getAttribute('data-id');

  const nombre = document.getElementById('editNombre').value;
  const imagen = document.getElementById('editImagen').value;
  const categoria = document.getElementById('editCategoria').value;
  const cantidad = document.getElementById('editCantidad').value;
  const tipoZapato = document.getElementById('editTipoZapato').value;
  const tallas = document.getElementById('editTallas').value;
  const colores = document.getElementById('editColores').value;

  const productRow = document.getElementById('product' + productId);
  productRow.cells[2].textContent = nombre;
  productRow.cells[1].getElementsByTagName('img')[0].src = imagen;
  productRow.cells[3].textContent = categoria;
  productRow.cells[0].textContent = cantidad;
  productRow.cells[4].textContent = tipoZapato;
  productRow.cells[5].textContent = colores;
  productRow.cells[6].textContent = tallas;

  document.getElementById('editModal').style.display = 'none';
});


// Función de búsqueda de productos
function searchProducts() {
  const input = document.getElementById('search').value.toLowerCase();  // Obtiene el valor de búsqueda en minúsculas
  const table = document.getElementById('inventory-table');
  const rows = table.getElementsByTagName('tr');

  // Iterar sobre cada fila, comenzando desde 1 para omitir el encabezado
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let matchFound = false;

    // Comprobar si alguna celda de la fila contiene el texto de búsqueda
    for (let j = 0; j < cells.length; j++) {
      const cellValue = cells[j].textContent.toLowerCase();
      if (cellValue.indexOf(input) > -1) {
        matchFound = true;  // Si hay coincidencia, marcarlo
        break;
      }
    }

    // Mostrar u ocultar la fila dependiendo de si hay coincidencias
    if (matchFound) {
      rows[i].style.display = '';  // Mostrar fila si hay coincidencia
    } else {
      rows[i].style.display = 'none';  // Ocultar fila si no hay coincidencia
    }
  }
}

// Función de filtrado
function filterProducts() {
  const categoria = document.getElementById('categoria-filter').value.toLowerCase();
  const tipoZapato = document.getElementById('tipoZapato-filter').value.toLowerCase();
  const colores = document.getElementById('colores-filter').value.toLowerCase();
  const tallas = document.getElementById('tallas-filter').value.toLowerCase();

  const table = document.getElementById('inventory-table');
  const rows = table.getElementsByTagName('tr');

  // Iterar sobre cada fila, comenzando desde 1 para omitir el encabezado
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    
    // Obtener los valores de las celdas de la fila
    const categoriaCell = cells[3].textContent.toLowerCase();
    const tipoZapatoCell = cells[4].textContent.toLowerCase();
    const coloresCell = cells[5].textContent.toLowerCase();
    const tallasCell = cells[6].textContent.toLowerCase();

    // Comprobar si todas las condiciones de los filtros coinciden
    if (
      (categoria === "" || categoriaCell.indexOf(categoria) > -1) &&
      (tipoZapato === "" || tipoZapatoCell.indexOf(tipoZapato) > -1) &&
      (colores === "" || coloresCell.indexOf(colores) > -1) &&
      (tallas === "" || tallasCell.indexOf(tallas) > -1)
    ) {
      rows[i].style.display = '';  // Mostrar fila si cumple con los filtros
    } else {
      rows[i].style.display = 'none';  // Ocultar fila si no cumple con los filtros
    }
  }
}