document.querySelector('.form-container').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    
    clearMessages();
    
    let isValid = true;
  
    // Name validation
    if (!name) {
      showError('name', 'Name is required');
      isValid = false;
    } else if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters');
      isValid = false;
    }
  
    // Stricter email validation (must contain .something)
    if (!email) {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showError('email', 'Please enter a valid email (example@domain.com)');
      isValid = false;
    }
  
    // Strict contact number validation
    if (!contact) {
      showError('contact', 'Contact number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(contact)) {
      showError('contact', 'Please enter exactly 10 digits (numbers only)');
      isValid = false;
    }
  
    if (isValid) {
      showSuccess();
      // form.submit(); // Uncomment for real form submission
      console.log('Form submitted:', { name, email, contact }); // Demo only
    }
});
  
// Prevent non-numeric input in contact field
document.getElementById('contact').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, ''); // Remove all non-digit characters
});
  
// Helper functions
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '5px';
    
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    field.style.borderColor = 'red';
}
  
function showSuccess() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = 'Form submitted successfully!';
    successMsg.style.color = 'green';
    successMsg.style.margin = '15px 0';
    successMsg.style.fontWeight = 'bold';
    
    document.querySelector('.form-container').prepend(successMsg);
    setTimeout(() => successMsg.remove(), 5000);
}
  
function clearMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
    document.querySelectorAll('input').forEach(input => {
        input.style.borderColor = '';
    });
}