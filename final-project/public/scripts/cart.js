/*
  Name: Tanisha Agarwal
  Date: December 14th, 2024
  
  Description:
  This script handles the functionality for the cart page of the Mystic Brews e-commerce project.
  Users can:
  - View items currently in their cart,  fetched from localStorage.
  - Remove individual quantities of potions or remove entire items from the cart.
  - Checkout their cart, sending data to a backend API, and clear the cart upon successful checkout.

  Features:
  - Dynamically displays cart items in a styled format.
  - Provides buttons for removing one quantity or all quantities of an item.
  - Handles the checkout process with error handling for unsuccessful attempts.
  - Displays messages for empty cart and checkout success/errors.

  Future Enhancements:
  - Add animations for removing items or showing messages.
*/

(function () {
    "use strict";

    // DOM element selectors
    const cartContainer = document.getElementById("cart-container"); // Container to display cart items
    const checkoutBtn = document.getElementById("checkout-btn"); // Button for checkout
    const checkoutResponse = document.getElementById("checkout-response"); // Placeholder for checkout messages

    // API URLs and paths
    const BASE_URL = "/";
    const CHECKOUT_URL = BASE_URL + "checkout"; // API endpoint for checkout
    const IMG_PATH = "images/"; // Path for potion images

    /**
     * Loads the cart items from localStorage and displays them on the page.
     */
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        displayCart(cart);
    }

    /**
     * Dynamically generates the cart items and displays them in the cart container.
     * @param {Array} cart - The list of items in the cart.
     */
    function displayCart(cart) {
        cartContainer.innerHTML = ""; // Clear any previous content

        // If the cart is empty, display a message
        if (cart.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "Your cart is empty.";
            cartContainer.appendChild(emptyMessage);
            return;
        }

        // Generate an article for each cart item
        cart.forEach((item, index) => {
            const article = document.createElement("article");
            article.classList.add("potion");

            // Image of the potion
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = IMG_PATH + item.image;
            img.alt = item.name;
            figure.appendChild(img);

            // Potion details
            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("details");

            const nameP = document.createElement("p");
            nameP.textContent = "Name: " + item.name;

            const priceP = document.createElement("p");
            priceP.textContent = "Price: " + item.price.toFixed(2) + " leprachauns";

            const colourP = document.createElement("p");
            colourP.textContent = "Colour: " + item.colour;

            const ingrP = document.createElement("p");
            ingrP.textContent = "Ingredients: " + item.ingredients.join(", ");

            const qtyP = document.createElement("p");
            qtyP.textContent = "Quantity: " + item.quantity;

            // Buttons for removing items
            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("buttons");

            const removeOneBtn = document.createElement("button");
            removeOneBtn.textContent = "Remove One";
            removeOneBtn.addEventListener("click", () => {
                removeOneItem(index);
            });

            const removeAllBtn = document.createElement("button");
            removeAllBtn.textContent = "Remove All";
            removeAllBtn.addEventListener("click", () => {
                removeAllItem(index);
            });

            buttonsDiv.appendChild(removeOneBtn);
            buttonsDiv.appendChild(removeAllBtn);

            // Append details and buttons to the detailsDiv
            detailsDiv.appendChild(nameP);
            detailsDiv.appendChild(priceP);
            detailsDiv.appendChild(colourP);
            detailsDiv.appendChild(ingrP);
            detailsDiv.appendChild(qtyP);
            detailsDiv.appendChild(buttonsDiv);

            // Append figure and detailsDiv to the article
            article.appendChild(figure);
            article.appendChild(detailsDiv);

            // Add the article to the cart container
            cartContainer.appendChild(article);
        });
    }

    /**
     * Removes one quantity of the specified item from the cart.
     * @param {number} index - Index of the item in the cart array.
     */
    function removeOneItem(index) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    /**
     * Removes all quantities of the specified item from the cart.
     * @param {number} index - Index of the item in the cart array.
     */
    function removeAllItem(index) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    /**
     * Handles the checkout process.
     */
    async function handleCheckout() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            displayEmptyCartMessage();
            return;
        }

        const checkoutItems = prepareCheckoutData(cart);

        try {
            const response = await submitCheckoutData(checkoutItems);
            handleCheckoutResponse(response);
        } 
        catch (error) {
            checkoutResponse.textContent = "Error during checkout: " + error.message;
        }
    }

    /**
     * Displays an empty cart message to the user.
     */
    function displayEmptyCartMessage() {
        checkoutResponse.textContent = ""; // Clear any existing message
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty. Go buy yourselves some spooky somethings and continue shopping on the homepage!";
        checkoutResponse.appendChild(emptyMessage);
    }

    /**
     * Prepares the checkout data from the cart.
     * @param {Array} cart - The list of cart items.
     * @returns {Array} The formatted data for the checkout process.
     */
    function prepareCheckoutData(cart) {
        return cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
        }));
    }

    /**
     * Submits the checkout data to the backend API.
     * @param {Array} checkoutItems - The items to be checked out.
     * @returns {Object} The response from the backend.
     */
    async function submitCheckoutData(checkoutItems) {
        const response = await fetch(CHECKOUT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkoutItems),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Checkout failed");
        }

        return await response.json();
    }

    /**
     * Handles the response from the checkout API and updates the UI.
     * @param {Object} response - The response data from the checkout API.
     */
    function handleCheckoutResponse(response) {
        checkoutResponse.textContent =
            response.message + " Total Cost: " + response.totalCost.toFixed(2) + " leprachauns";

        // Clear message after 5 seconds
        setTimeout(() => {
            checkoutResponse.textContent = "";
        }, 5000);

        // Clear cart after successful checkout
        localStorage.removeItem("cart");
        loadCart();
    }

    /**
     * Initializes the page by loading the cart and setting up listeners.
     */
    function init() {
        loadCart();
        checkoutBtn.addEventListener("click", handleCheckout);
    }

    // Initialize the cart page functionality
    init();

})();
