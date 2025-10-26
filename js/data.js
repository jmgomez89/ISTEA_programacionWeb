//Data


const productsContainer = document.getElementById('products-cards-grid');
const searchInput = document.getElementById('search-input');
const prop = document.getElementsByClassName('prop');
const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('header-content-nav-hamburger');
const closeHamburgerMenu = document.getElementById('close-btn');
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const productDetailContainer = document.getElementById('product-detail');
let products = [];

const AIRTABLE_API_KEY = "pat3c8FaWrNy5AZoF.6b0864f4af38bf8285fe1e5deb9c73317dfcd1d33904e3388e7f266831a5e533";
const BASE_ID = "appnDqVrWQ7c1go0B";
const TABLE_NAME = "Products";

async function fetchProducts() {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    products = data.records.map(record => {
      const fields = record.fields;
      return {
        id: fields.Id, // o usa record.id si usas el ID de Airtable
        name: fields.Name || 'Sin nombre',
        price: fields.Price || 0,
        image: fields.Image && fields.Image[0] ? fields.Image[0].url : './img/placeholder.jpg',
        details: fields.Details || 'Sin descripción'
      };
    });

    console.log('Productos cargados desde Airtable:', products);

    return products;
  } catch (error) {
    console.error('Error al cargar productos desde Airtable:', error);
    products = []; 
  }
};

