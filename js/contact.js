document.addEventListener('DOMContentLoaded', () => {


  form.addEventListener('submit', async (e) => {
    e.preventDefault(); 


    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const matter = document.getElementById('matter').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
      await submitContactForm({ name, lastName, email, phone, matter, message });
      showMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto lo antes posible.', 'success');
      form.reset(); 
    } catch (error) {
      console.error('Error:', error);
      showMessage('Hubo un error al enviar el mensaje. Por favor, intentalo de nuevo.', 'error');
    } 
  });



});

