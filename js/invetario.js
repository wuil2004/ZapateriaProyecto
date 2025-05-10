const abrir = document.getElementById("abrirModal");
    const modal = document.getElementById("miModal");
    const cerrar = document.getElementById("cerrarModal");

    abrir.onclick = () => modal.style.display = "block";
    cerrar.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };

function searchProducts() {
    const input = document.getElementById('search').value.toLowerCase();
    const table = document.getElementById('inventory-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {  // Empieza desde 1 para omitir el encabezado
        const cells = rows[i].getElementsByTagName('td');
        let matchFound = false;

        // Comprobar cada celda de la fila
        for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].textContent.toLowerCase();
            if (cellValue.indexOf(input) > -1) {
                matchFound = true;
                break;
            }
        }

        // Mostrar u ocultar fila según si coincide con la búsqueda
        if (matchFound) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}