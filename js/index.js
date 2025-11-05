document.addEventListener('DOMContentLoaded', async () => {
    
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

    // document.addEventListener('click', (e) => {
    // if (e.target.classList.contains('product-card-addbtn')) {
    //   e.preventDefault(); 

    //   const productId = parseInt(e.target.dataset.id);
    //   addToCart(productId); 

    //   window.location.href = './cart.html';
    // }});

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
                <a class="product-card-addbtn" data-id="${products.id}">🛒 Agregar al Carrito</a>
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


//Carrito de compras

// function addToCart(productId) {

//   let cart = JSON.parse(localStorage.getItem('cart') || '[]');
//   console.log(cart);

//   const product = products.find(p => p.id === productId);
//   if (!product) return;

//   const existingItem = cart.find(item => item.id === productId);
  
//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cart.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: 1
//     });
//   }

//   localStorage.setItem('cart', JSON.stringify(cart));
// }