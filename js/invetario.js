const abrir = document.getElementById("abrirModal");
const modal = document.getElementById("miModal");
const cerrar = document.getElementById("cerrarModal");

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

    // Cerrar el modal después de agregar el producto
    modal.style.display = "none";

    // Limpiar el formulario
    document.getElementById("formularioProducto").reset();
});

// Funcionalidad para el campo de búsqueda
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
