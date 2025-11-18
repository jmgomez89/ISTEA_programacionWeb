document.addEventListener('DOMContentLoaded', async () => {

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  updateCartBadge();
  
  await fetchProducts();
  
  const product = products.find(p => p.recordId === productId);
  console.log(product.recordId)
  const html = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-info-name">${product.name}</div>
                <div class="product-info-price">${formatPrice(product.price)}.-</div>
                <div class="product-info-description">${product.details}</div>
            </div>
            <a class="product-card-addbtn" 
                data-id="${product.recordId}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-image="${product.image}"
                data-stock="${product.stock}"
                ${product.stock <= 0 ? 'disabled' : ''}>
                ${product.stock <= 0 ? '❌ Sin stock' : '🛒 Agregar al Carrito'}
            </a>
        `;

  productDetailContainer.innerHTML = html;

      //Menú Hamburguesa 
    hamburger.addEventListener('click', () => {
      hamburgerMenu.classList.add('active');
    });

    closeHamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
    });
  
});

