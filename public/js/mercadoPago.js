const mp = new MercadoPago("TEST-cc3bde08-97eb-4673-b967-43dbda11c046", {
    locale: "es-AR",
  });
  
  document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
      const orderData = {
        title: document.querySelector(".nombreDetail").innerText,
        quantity: parseInt(document.getElementById("quantity").value, 10),
        price: parseFloat(document.querySelector(".Precio").innerText.replace("Precio: $", "").trim()),
      };
  
      const response = await fetch("http://localhost:3000/products/create_preference", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
  
      const preference = await response.json();
  
      createCheckoutButton(preference.id);
    } catch (error) {
      alert("Error");
    }
  });
  
  const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();
  
    const renderComponent = async () => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preferenceId,
        },
        customization: {
          texts: {
            valueProp: "smart_option",
          },
        },
      });
    };
    renderComponent();
  };