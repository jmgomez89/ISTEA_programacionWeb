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
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const productDetailContainer = document.getElementById('product-detail');