// Mostrar el modal de edición y cargar datos
function editProduct(button) {
  // Obtener el ID del producto desde el atributo data-id del botón
  const productId = button.getAttribute('data-id');
  
  // Obtener los datos del producto (aquí estamos usando el ID de producto)
  const productRow = document.getElementById('product' + productId); // Aquí accedemos a la fila específica por el ID del producto

  // Llenar el formulario con los datos del producto
  document.getElementById('editNombre').value = productRow.cells[2].textContent;
  document.getElementById('editImagen').value = productRow.cells[1].getElementsByTagName('img')[0].src;
  document.getElementById('editCategoria').value = productRow.cells[3].textContent;
  document.getElementById('editCantidad').value = productRow.cells[0].textContent;
  document.getElementById('editTipoZapato').value = productRow.cells[4].textContent;
  document.getElementById('editTallas').value = productRow.cells[6].textContent;
  document.getElementById('editColores').value = productRow.cells[5].textContent;

  // Abrir el modal de edición
  document.getElementById('editModal').style.display = 'block';

  // Guardar el ID del producto en un atributo del formulario para usarlo después
  document.getElementById('editForm').setAttribute('data-id', productId);
}

// Cerrar el modal de edición
document.getElementById('closeEditModal').onclick = function() {
  document.getElementById('editModal').style.display = 'none';
};

// Guardar los cambios y actualizar la tabla
document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar que el formulario recargue la página

  // Obtener el ID del producto desde el atributo data-id del formulario
  const productId = document.getElementById('editForm').getAttribute('data-id');

  // Obtener los valores del formulario
  const nombre = document.getElementById('editNombre').value;
  const imagen = document.getElementById('editImagen').value;
  const categoria = document.getElementById('editCategoria').value;
  const cantidad = document.getElementById('editCantidad').value;
  const tipoZapato = document.getElementById('editTipoZapato').value;
  const tallas = document.getElementById('editTallas').value;
  const colores = document.getElementById('editColores').value;

  // Actualizar la fila de la tabla con los nuevos valores
  const productRow = document.getElementById('product' + productId); // Aquí accedemos a la fila específica por el ID del producto
  productRow.cells[2].textContent = nombre;  // Nombre
  productRow.cells[1].getElementsByTagName('img')[0].src = imagen;  // Imagen
  productRow.cells[3].textContent = categoria;  // Categoría
  productRow.cells[0].textContent = cantidad;  // Cantidad
  productRow.cells[4].textContent = tipoZapato;  // Tipo de zapato
  productRow.cells[5].textContent = colores;  // Colores
  productRow.cells[6].textContent = tallas;  // Tallas

  // Cerrar el modal después de guardar los cambios
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
