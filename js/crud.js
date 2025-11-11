document.addEventListener('DOMContentLoaded', async () => {
    
    updateCartBadge();
    
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
          crudForm.reset();
          sectionProducts.style.display = 'none';
          crudForm.style.display = 'block';
    });

    buttonBack.addEventListener('click', function(e) {
          e.preventDefault();
          crudForm.reset();
          crudForm.style.display = 'none';
          sectionProducts.style.display = 'block';
    });

    crudForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const recordId = e.target.dataset.recordId;
      if (recordId) {
      return;
      }

      const name = document.getElementById('product-name').value.trim();
      const stock = document.getElementById('product-stock').value;
      const price = document.getElementById('product-price').value;
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



    });

    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('product-card-btn-delete')) {
            const recordId = e.target.dataset.recordId;

            if (!recordId) {
            return;
            }

            if (!confirm('¿Seguro que deseas eliminar este producto?')) {
            return;
            }

            try {
            await deleteProductFromAirtable(recordId);
            const card = e.target.closest('.product-card');
            if (card) card.remove();
            alert('Producto eliminado con éxito ✅');

            } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Error al eliminar el producto. Revisa la consola para más detalles.');
            }
        }
    });


    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('product-card-btn-mod')) {
            
            const recordId = e.target.dataset.recordId;

            try {
            const fields = await fetchProductFromAirtable(recordId);
            sectionProducts.style.display = 'none';
            crudForm.style.display = 'block';

            document.getElementById('product-name').value = fields.Name || '';
            document.getElementById('product-stock').value = fields.Stock || '';
            document.getElementById('product-price').value = fields.Price || '';
            document.getElementById('product-details').value = fields.Details || '';
            crudForm.dataset.recordId = recordId;

            const submitBtn = document.getElementById('btn-product-save');
            if (submitBtn) submitBtn.textContent = 'Actualizar Producto';
            
            } catch (error) {
            console.error('🔥 Error al cargar producto para editar:', error);
            alert('No se pudo cargar el producto. Revisa la consola.');
            }
        }

    });

    crudForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('btn-product-save');
        if (submitBtn.textContent != 'Actualizar Producto'){
            return;
        }
        
        const recordId = crudForm.dataset.recordId;

        if (!recordId) {
            showMessage('Error: no se puede actualizar sin ID de producto.', 'error');
            return;
        }

        const formData = {
            Name: document.getElementById('product-name').value.trim(),
            Stock: Number(document.getElementById('product-stock').value) || 0,
            Price: Number(document.getElementById('product-price').value) || 0,
            Details: document.getElementById('product-details').value.trim()
        };

        try {
            await updateProductInAirtable(recordId, formData);
            crudForm.reset();
            delete crudForm.dataset.recordId;
            showMessage('¡Producto actualizado con éxito!', 'success');
            setTimeout(() => {
                crudForm.style.display = 'none';
                sectionProducts.style.display = 'block';
                fetchProducts().then(renderProducts);
                }, 2000);
            }
            catch (error) {
            console.error('Error:', error);
            showMessage('Hubo un error al actualizar el producto. Por favor, intentalo de nuevo.', 'error');
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
      <button class="product-card-btn-mod" data-record-id="${products.recordId}">✏️ Modificar</button>
      <button class="product-card-btn-delete" data-record-id="${products.recordId}">🗑️ Eliminar</button>
    </div>
  `;
}

function renderProducts() {

  productsContainer.innerHTML = products.map(cardProducts).join('');
} 


