document.addEventListener('DOMContentLoaded', async () => {
    
    updateCartBadge();

    await fetchProducts();

    if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {

      renderProducts();

      searchInput.addEventListener('input', (e) => { 
          prop[0].style.display = 'none';
          const searchTerm = e.target.value;
          filterAndRenderProducts(searchTerm);
      });

    }


    //Menú Hamburguesa 
    hamburger.addEventListener('click', () => {
      hamburgerMenu.classList.add('active');
    });

    closeHamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('product-card-addbtn')) {
        const btn = e.target;
        
        const product = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          image: btn.dataset.image,
          stock: parseInt(btn.dataset.stock)
        };

        addToCart(product);
      }
    });



});



// Renderizado de productos

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
}

function cardProducts(products) {
    return `
            <div class="product-card">
                <img src=${products.image} alt=${products.name}>
                <div class="product-card-name">${products.name}</div>
                <div class="product-card-price">${formatPrice(products.price)}.-</div>
                <a class="product-card-addbtn" 
                data-id="${products.recordId}"
                data-name="${products.name}"
                data-price="${products.price}"
                data-image="${products.image}"
                data-stock="${products.stock}"
                ${products.stock <= 0 ? 'disabled' : ''}>
                ${products.stock <= 0 ? '❌ Sin stock' : '🛒 Agregar'}
                </a>
                <a href="./product.html?id=${products.id}" class="product-card-btn">🔍 Ver Producto</a>
            </div> `
}

function renderProducts() {

  productsContainer.innerHTML = products.map(cardProducts).join('');
} 

//Filtro de productos

function filterAndRenderProducts(searchTerm) {

  if (!searchTerm.trim()) {
    prop[0].style.display = 'block';
    renderProducts();
    return;
  }

  const term = searchTerm.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(term) || 
    product.details.toLowerCase().includes(term)
  );

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '<p class="no-results">No se encontraron productos.</p>';
  } else {
    productsContainer.innerHTML = filteredProducts.map(cardProducts).join('');
  }
}
