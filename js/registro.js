function actualizarRolTexto() {
    const rolTexto = document.getElementById('rolTexto');
    const esAdmin = document.getElementById('rolSwitch').checked;
    rolTexto.textContent =  (esAdmin ? 'Administrador' : 'Empleado');
  }