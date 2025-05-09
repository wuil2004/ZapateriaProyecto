const abrir = document.getElementById("abrirModal");
    const modal = document.getElementById("miModal");
    const cerrar = document.getElementById("cerrarModal");

    abrir.onclick = () => modal.style.display = "block";
    cerrar.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };