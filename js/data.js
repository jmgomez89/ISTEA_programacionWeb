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
const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');
let products = [];

const AIRTABLE_API_KEY = "pat3c8FaWrNy5AZoF.6b0864f4af38bf8285fe1e5deb9c73317dfcd1d33904e3388e7f266831a5e533";
const BASE_ID = "appnDqVrWQ7c1go0B";
const TABLE_NAME = "Products";
const CONTACT_TABLE_NAME = "Contact";
const BASE_ID_CONTACT = "appnDqVrWQ7c1go0B";

//Fetch de productos desde Airtable

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
        id: fields.Id, 
        name: fields.Name || 'Sin nombre',
        price: fields.Price || 0,
        image: fields.Image && fields.Image[0] ? fields.Image[0].url : './img/placeholder.jpg',
        details: fields.Details || 'Sin descripción'
      };
    });


    return products;
  } catch (error) {
    console.error('Error al cargar productos desde Airtable:', error);
    products = []; 
  }
};



// Enviar mensaje de contacto a Airtable

async function submitContactForm(contactData) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID_CONTACT}/${CONTACT_TABLE_NAME}`, // ← nombre de tu tabla
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            Name: contactData.name,
            LastName: contactData.lastName,
            Email: contactData.email,
            Phone: contactData.phone,
            Matter: contactData.matter,
            Message: contactData.message,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Desconocido'}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    throw error;
  }

}