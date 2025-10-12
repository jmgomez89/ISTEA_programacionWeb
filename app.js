
document.addEventListener('DOMContentLoaded', () => {
    
    //Render de productos
    renderProducts(); 

    //Captura input de búsqueda y renderiza según corresponda
    searchInput.addEventListener('input', (e) => { 
        prop[0].style.display = 'none';
        const searchTerm = e.target.value;
        filterAndRenderProducts(searchTerm);
    });

    //Menú Hamburguesa 
    hamburger.addEventListener('click', () => {
      hamburgerMenu.classList.add('active');
    });

    closeHamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
    });

});

//Data

const products = [
    { id: 1, name: "Celular Motorola G05 4GB 128GB", price: 158000, image: "./img/celular.jpg", details: "Disfruta de un rendimiento excepcional con el Celular Motorola G05, que cuenta con 4GB de RAM y 128GB de almacenamiento interno. Perfecto para multitarea y almacenamiento de tus aplicaciones y archivos favoritos." },
    { id: 2, name: "Auriculares Inalámbricos Blackpoint", price: 58000, image: "./img/auriculares.jpg", details: "Experimenta la libertad del sonido sin cables con los Auriculares Inalámbricos Blackpoint. Con una calidad de audio superior y un diseño cómodo, son ideales para escuchar música y atender llamadas en cualquier lugar." },
    { id: 3, name: "Freidora de Aire Atma", price: 258000, image: "./img/freidora.jpg", details: "Cocina de manera saludable y deliciosa con la Freidora de Aire Atma. Con tecnología de circulación de aire caliente, puedes preparar tus comidas favoritas con menos aceite, manteniendo el sabor y la textura crujiente." },
    { id: 4, name: "Lavarropas Automático Philco", price: 550000, image: "./img/lavarropas.jpg", details: "Facilita tus tareas de lavandería con el Lavarropas Automático Philco. Con múltiples programas de lavado y una capacidad adecuada, este lavarropas garantiza ropa limpia y fresca en cada ciclo." },
    { id: 5, name: "Notebook Celeron 14.1 4GB 128 GB SSD Philco", price: 1258000, image: "./img/notebook.jpg", details: "Trabaja y estudia con eficiencia con la Notebook Celeron 14.1 de Philco. Equipado con 4GB de RAM y un rápido SSD de 128GB, esta laptop es perfecta para tareas diarias, navegación web y aplicaciones de productividad." },
    { id: 6, name: "Play station 5", price: 1600000, image: "./img/play.jpg", details: "Sumérgete en el mundo del gaming con la PlayStation 5. Con gráficos de última generación, tiempos de carga ultrarrápidos y una amplia biblioteca de juegos, la PS5 ofrece una experiencia de juego inigualable para todos los entusiastas." }
];

const productsContainer = document.getElementById('products-cards-grid');
const searchInput = document.getElementById('search-input');
const prop = document.getElementsByClassName('prop');
const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('header-content-nav-hamburger');
const closeHamburgerMenu = document.getElementById('close-btn');


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
                <a href="./product.html" class="product-card-btn" id="${products.id}">Ver Producto</a>
            </div> `
}

function renderProducts() {
  productsContainer.innerHTML = products.map(cardProducts).join('');
} 

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

