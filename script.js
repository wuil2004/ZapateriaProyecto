let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();

  const closeButton = document.getElementById('close-details');
  closeButton.addEventListener('click', function () {
    document.getElementById('product-details').style.display = 'none';
    resetProductDetails();
  });
});

function showProductDetails(event, name, price, stock, sizes, colors, image) {
  const clickedCard = event.currentTarget;
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('selected'));
  clickedCard.classList.add('selected');

  document.getElementById('product-name').textContent = name;
  document.getElementById('product-price').textContent = `Precio: $${price}.00`;
  document.getElementById("product-stock").textContent = `Stock disponible: ${stock}`;

  fillSelectOptions('size', sizes);
  fillSelectOptions('color', colors);

  document.getElementById('product-details').style.display = 'block';

  document.getElementById('add-to-cart').onclick = function () {
    const selectedSize = document.getElementById('size').value;
    const selectedColor = document.getElementById('color').value;

    if (!selectedSize || !selectedColor) {
      alert('Por favor, selecciona un tamaño y un color.');
      return;
    }

    const product = {
      id: `${name}-${image}`, // identificador simple
      name,
      price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      image,
      availableSizes: sizes,
      availableColors: colors,
      stock
    };

    addToCart(product);
    document.getElementById('product-details').style.display = 'none';
    resetProductDetails();
  };
}

function fillSelectOptions(selectId, options) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  select.disabled = false;
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingIndex = cart.findIndex(item =>
    item.id === product.id &&
    item.size === product.size &&
    item.color === product.color
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

function resetProductDetails() {
  document.getElementById('product-name').textContent = '';
  document.getElementById('product-price').textContent = '';
  document.getElementById('size').innerHTML = '';
  document.getElementById('color').innerHTML = '';
  document.getElementById('size').disabled = true;
  document.getElementById('color').disabled = true;
}
document.addEventListener('DOMContentLoaded', function () {
  const productos = document.querySelectorAll('.unidades-comprar');

  productos.forEach((productoSpan) => {
    const id = productoSpan.dataset.id;
    const cantidad = parseInt(productoSpan.textContent, 10);
    const stockSpan = document.querySelector(`.stock-disponible[data-id="${id}"]`);
    const stock = parseInt(stockSpan.textContent, 10);

    if (cantidad > stock) {
      alert(`La cantidad solicitada del producto ID ${id} supera el stock disponible (${stock}).`);
      productoSpan.style.color = 'red';
    }
  });
});

function searchProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
      const name = card.querySelector('.card__name p').textContent.toLowerCase();
      card.style.display = name.includes(query) ? 'block' : 'none';
  });
}
