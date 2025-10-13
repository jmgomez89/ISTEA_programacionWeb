document.addEventListener('DOMContentLoaded', () => {


  if (!productId) {
    document.getElementById('product-detail').innerHTML = `
      <h2>Producto no encontrado</h2>
      <p>El enlace es inválido.</p>
    `;
    return;
  }

  const product = products.find(p => p.id === productId);


  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <h2>Producto no encontrado</h2>
      <p>No existe un producto con ID ${productId}.</p>
    `;
    return;
  }


  const html = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-info-name">${product.name}</div>
                <div class="product-info-price">${formatPrice(product.price)}.-</div>
                <div class="product-info-description">${product.details}</div>
            </div>
            <a href="./cart.html" class="product-card-addbtn" data-id="${products.id}">🛒 Agregar al Carrito</a>
        `;

  productDetailContainer.innerHTML = html;
});

