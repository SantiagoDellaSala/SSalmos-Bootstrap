document.addEventListener('DOMContentLoaded', function() {
  // Obtener el stock disponible
  const stock = parseInt(document.getElementById('stock').innerText, 10);

  // Obtener el campo de cantidad
  const quantityInput = document.getElementById('quantity');

  // Validar la cantidad ingresada
  quantityInput.addEventListener('input', function() {
    let quantity = parseInt(quantityInput.value, 10);

    // Si la cantidad excede el stock, ajustar la cantidad al stock disponible
    if (quantity > stock) {
      quantityInput.value = stock;
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad excedida',
        text: `La cantidad no puede exceder el stock disponible de ${stock} unidades.`,
        confirmButtonText: 'Aceptar'
      });
    } else if (quantity < 1) {
      // Asegurarse de que la cantidad no sea menor a 1
      quantityInput.value = 1;
    }
  });
});
