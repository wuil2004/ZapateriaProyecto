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
