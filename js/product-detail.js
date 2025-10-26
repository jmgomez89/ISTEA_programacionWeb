document.addEventListener('DOMContentLoaded', async () => {

  await fetchProducts();

  const product = products.find(p => p.id === productId);

  const html = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-info-name">${product.name}</div>
                <div class="product-info-price">${formatPrice(product.price)}.-</div>
                <div class="product-info-description">${product.details}</div>
            </div>
            <a class="product-card-addbtn" data-id="${products.id}">🛒 Agregar al Carrito</a>
        `;

  productDetailContainer.innerHTML = html;
});

