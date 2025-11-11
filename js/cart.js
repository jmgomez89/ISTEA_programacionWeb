document.addEventListener('DOMContentLoaded', () => {

  renderCart();

    document.addEventListener('click', (e) => {
    const cart = getCart();

    // Botón "-" (disminuir) → clase: btn-cart-add
    if (e.target.classList.contains('btn-cart-add')) {
        const index = e.target.dataset.index;
        const item = cart[index];
        
        if (item.quantity > 1) {
        item.quantity--;
        } else {
        // Si es 1, eliminamos el ítem
        cart.splice(index, 1);
        }
        
        saveCart(cart);
        renderCart();
        updateCartBadge(); // actualiza el contador global
        return;
    }

    // Botón "+" (aumentar) → clase: btn-cart-del
    if (e.target.classList.contains('btn-cart-del')) {
        const index = e.target.dataset.index;
        const item = cart[index];
        
        if (item.quantity + 1 > item.stock) {
        alert(`Solo hay ${item.stock} unidades disponibles de "${item.name}".`);
        return;
        }
        
        item.quantity++;
        saveCart(cart);
        renderCart();
        return;
    }
    });

        //Menú Hamburguesa 
    hamburger.addEventListener('click', () => {
      hamburgerMenu.classList.add('active');
    });

    closeHamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
    });


});

// Renderizado del carrito de compras

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="no-results">El carrito está vacío.</p>';
    totalCart.style.display = 'none';
    cartInfo.style.display = 'none';
    return;
  }

  let total = 0;
  let envio = 0;
  let html = '';

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    envio += itemTotal * 0.1;
    html += `
      <div class="cart-items">
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">${item.name}</div>
          <div class="item-price">${formatPrice(item.price)}.-</div>
        </div>
        <div class="cart-item-quantity">
          <div class="btn-cart-add" data-index="${index}">-</div>
          <div class="btn-cart-q">Cantidad: ${item.quantity}</div>
          <div class="btn-cart-del" data-index="${index}">+</div>
        </div>
      </div>
    `;
  });

  cartContainer.innerHTML = html;
  if (totalCart) {
    totalCart.style.display = 'block';
    totalCart.innerHTML = `<div class="cart-total-sub"><span>Subtotal:</span> <span>${formatPrice(total)}.-</span></div>
                <div class="cart-total-ship"><span>Envío:</span> <span>${formatPrice(envio)}.-</span></div>
                <div class="cart-total-sum"><span>Total:</span> <span>${formatPrice(total + envio)}.-</span></div>
                <a href="./index.html" class="btn-cart-back">Seguir comprando</a>
                <a href="#products" class="btn-cart-buy">Comprar</a>
                `;
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
}