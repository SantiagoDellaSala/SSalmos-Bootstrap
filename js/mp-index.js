// js/index.js
document.addEventListener('DOMContentLoaded', function () {
    const mercadopago = new MercadoPago('YOUR_PUBLIC_KEY', {
      locale: 'es-AR'
    });
  
    const checkoutButton = document.getElementById('checkout-btn');
    const quantityInput = document.getElementById('quantity');
    const unitPriceElement = document.getElementById('unit-price');
    const cartTotalElement = document.getElementById('cart-total');
    const summaryPriceElement = document.getElementById('summary-price');
    const summaryQuantityElement = document.getElementById('summary-quantity');
    const summaryTotalElement = document.getElementById('summary-total');
    const buttonCheckoutElement = document.getElementById('button-checkout');
    const goBackLink = document.getElementById('go-back');
  
    function updateCart() {
      const unitPrice = parseFloat(unitPriceElement.textContent);
      const quantity = parseInt(quantityInput.value);
      const cartTotal = unitPrice * quantity;
      cartTotalElement.textContent = `$ ${cartTotal.toFixed(2)}`;
    }
  
    updateCart();
  
    quantityInput.addEventListener('input', updateCart);
  
    checkoutButton.addEventListener('click', function () {
      const quantity = parseInt(quantityInput.value);
      const unitPrice = parseFloat(unitPriceElement.textContent);
      const description = '<%= product.name %>';  // Assuming you want to use the product name
  
      fetch('/payment/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName: description,
          productPrice: unitPrice,
          quantity: quantity
        })
      })
        .then(response => response.json())
        .then(preference => {
          mercadopago.checkout({
            preference: {
              id: preference.id
            },
            render: {
              container: '#button-checkout',
              label: 'Pagar',
            }
          });
  
          summaryPriceElement.textContent = `$ ${unitPrice.toFixed(2)}`;
          summaryQuantityElement.textContent = quantity;
          summaryTotalElement.textContent = `$ ${(unitPrice * quantity).toFixed(2)}`;
  
          document.querySelector('.shopping-cart').style.display = 'none';
          document.querySelector('.payment-form').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    });
  
    goBackLink.addEventListener('click', function (event) {
      event.preventDefault();
      document.querySelector('.shopping-cart').style.display = 'block';
      document.querySelector('.payment-form').style.display = 'none';
    });
  });  