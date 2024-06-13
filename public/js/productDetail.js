document.addEventListener('DOMContentLoaded', function() {
    // Obtener el stock disponible
    const stock = parseInt(document.getElementById('stock').innerText, 10);
    
    // Obtener el campo de cantidad
    const quantityInput = document.getElementById('quantity');
    
    // Establecer la compra mínima
    const compraMinima = 10;
    
    // Validar la cantidad ingresada
    quantityInput.addEventListener('input', function() {
      let quantity = parseInt(quantityInput.value, 10);
  
      // Si la cantidad es menor que la compra mínima, ajustarla
      if (quantity < compraMinima) {
        quantityInput.value = compraMinima;
        alert(`La cantidad mínima de compra es ${compraMinima} pares.`);
      } else if (quantity > stock) {
        // Si la cantidad excede el stock, ajustar la cantidad al stock disponible
        quantityInput.value = stock;
        alert(`La cantidad no puede exceder el stock disponible de ${stock} unidades.`);
      } else if (quantity < 1) {
        // Asegurarse de que la cantidad no sea menor a 1
        quantityInput.value = 1;
      }
    });
  });  