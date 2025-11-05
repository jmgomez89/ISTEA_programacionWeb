document.addEventListener('DOMContentLoaded', async () => {
    
    await fetchProducts();

    renderProducts();


    hamburger.addEventListener('click', () => {
      hamburgerMenu.classList.add('active');
    });

    closeHamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
    });

    buttonNew.addEventListener('click', function(e) {
          e.preventDefault();
          sectionProducts.style.display = 'none';
          crudForm.style.display = 'block';
    });

    buttonBack.addEventListener('click', function(e) {
          e.preventDefault();
          crudForm.style.display = 'none';
          sectionProducts.style.display = 'block';
    });

    crudForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('product-name').value.trim();
      const stock = document.getElementById('product-stock').value;
      const price = document.getElementById('producto-price').value;
      const details = document.getElementById('product-details').value.trim();
      const imageFile = document.getElementById('product-image').files[0];

      try {
      await submitCrudForm({ name, stock, price, details, image: imageFile });
      showMessage('¡Producto cargado con éxito!', 'success');
      crudForm.reset();
      setTimeout(() => {
        crudForm.style.display = 'none';
        sectionProducts.style.display = 'block';
        fetchProducts().then(renderProducts);
        }, 2000);
      }
       catch (error) {
      console.error('Error:', error);
      showMessage('Hubo un error al cargar el producto. Por favor, intentalo de nuevo.', 'error');
      } 


      function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
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
      <img src="${products.image}" alt="${products.name}">
      <div class="product-card-name">${products.name}</div>
      <div class="product-card-price">${formatPrice(products.price)}.-</div>
      <button class="product-card-addbtn" data-record-id="${products.recordId}">✏️ Modificar</button>
      <button class="product-card-btn" data-record-id="${products.recordId}">🗑️ Eliminar</button>
    </div>
  `;
}

function renderProducts() {

  productsContainer.innerHTML = products.map(cardProducts).join('');
} 


