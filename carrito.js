document.addEventListener('DOMContentLoaded', function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  displayCartItems(cart);

  function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('cart-item');

      productDiv.innerHTML = `
        <div class="product-image">
          <img src="img/${product.image}" alt="${product.name}" style="width:100px;">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>Talla: ${product.size}</p>
          <p>Color: ${product.color}</p>
          <p>Precio: $${product.price}</p>
          <p>Unidades disponibles: ${product.stock}</p>
          <label for="quantity-${index}">Cantidad a comprar:</label>
          <input type="number" id="quantity-${index}" value="${product.quantity}" min="1" max="${product.stock}">
          <button onclick="updateProductQuantity(${index})">Modificar</button>
          <p>Subtotal: $${(product.price * product.quantity).toFixed(2)}</p>
          <button onclick="openEditModal(${index})">✏️</button>
          <button onclick="deleteProduct(${index})">🗑️</button>
        </div>
      `;

      cartItemsContainer.appendChild(productDiv);
      totalPrice += product.price * product.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  window.updateProductQuantity = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newQuantity = parseInt(document.getElementById(`quantity-${index}`).value);
    const product = cart[index];

    if (newQuantity && newQuantity > 0 && newQuantity <= product.stock) {
      product.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      displayCartItems(cart);
    } else if (newQuantity > product.stock) {
      alert("ALERTA: La cantidad a comprar supera el stock disponible.");
    } else {
      alert("Cantidad inválida.");
    }
  };

  window.deleteProduct = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems(cart);
  };

  let currentEditIndex = null;

  window.openEditModal = function(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart[index];
    currentEditIndex = index;

    // Llenar select de tallas y colores con los valores específicos de ese producto
    const sizeSelect = document.getElementById('edit-size');
    const colorSelect = document.getElementById('edit-color');

    sizeSelect.innerHTML = '';
    product.availableSizes.forEach(size => {
      const option = document.createElement('option');
      option.value = size;
      option.textContent = size;
      if (size === product.size) option.selected = true;
      sizeSelect.appendChild(option);
    });

    colorSelect.innerHTML = '';
    product.availableColors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      if (color === product.color) option.selected = true;
      colorSelect.appendChild(option);
    });

    document.getElementById('edit-modal').style.display = 'block';
  };

  window.closeEditModal = function() {
    document.getElementById('edit-modal').style.display = 'none';
  };

  window.saveProductEdit = function() {
    const newSize = document.getElementById('edit-size').value;
    const newColor = document.getElementById('edit-color').value;

    if (!newSize || !newColor) {
      alert("Por favor, selecciona una talla y un color.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart[currentEditIndex];

    const duplicateIndex = cart.findIndex((item, idx) =>
      idx !== currentEditIndex &&
      item.id === product.id &&
      item.size === newSize &&
      item.color === newColor
    );

    if (duplicateIndex !== -1) {
      cart[duplicateIndex].quantity += product.quantity;
      cart.splice(currentEditIndex, 1);
    } else {
      product.size = newSize;
      product.color = newColor;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems(cart);
    closeEditModal();
  };

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
  }

  // Función para confirmar la compra y redirigir a la página de ticket
  document.getElementById('checkout-btn').addEventListener('click', function() {
    // Asegúrate de que el carrito tiene productos
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Solicitar el nombre del comprador
    const buyerName = prompt('¿Cuál es tu nombre?');  // Solicitar nombre del comprador
    if (!buyerName) {
      alert('El nombre es obligatorio');
      return;
    }

    // Obtener el total del carrito
    const cartTotal = document.getElementById('total-price').textContent;

    // Guardar los datos en localStorage
    localStorage.setItem('buyerName', buyerName);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', cartTotal);

    // Redirigir a la página de ticket
    window.location.href = 'ticket.html';
  });
});
