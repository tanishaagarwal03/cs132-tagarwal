/**
 * Name: Tanisha Agarwal
 * Date: December 14, 2024
 *
 * This JavaScript file is responsible for dynamically loading and displaying the details of a specific potion 
 * on the potion-detail.html page. The functionality includes:
 * - Fetching potion details from the server using an API call.
 * - Dynamically rendering potion information in a horizontal layout with styled components.
 * - Adding functionality to handle "Add to Cart" operations.
 * - Displaying success or error messages for actions, such as adding to cart.
 *
 * Features:
 * - Handles out-of-stock scenarios with user-friendly magical statements.
 * - Dynamically appends potion details to the DOM for enhanced interactivity.
 */

(function () {
    "use strict";

    // Base URLs and element selectors
    const BASE_URL = "/";
    const POTIONS_URL = BASE_URL + "potions"; // API endpoint for fetching potion details
    const IMG_PATH = "images/"; // Path to potion images
    const container = document.getElementById("potion-detail-container"); // Container for displaying the potion details

    // Extract the potion ID from the URL query string
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    /**
     * Fetches the potion details from the server and displays them.
     */
    async function loadPotion() {
        try {
            // Fetch potion details from the server
            const resp = await fetch(`${POTIONS_URL}/${id}`);
            if (!resp.ok) {
                container.textContent = "Potion not found.";
                return;
            }
            const potion = await resp.json();
            displayPotion(potion);
        }
        catch (error) {
            container.textContent = "Oh no! The magic seems to have fizzled out, and we couldn't fetch your potion. Please try casting the spell again (refresh the page)!";
        }
    }

    /**
     * Dynamically generates and displays the details of a specific potion.
     * @param {Object} p - Potion object containing all its details.
     */
    function displayPotion(p) {
        container.innerHTML = ""; // Clear any previous content

        const article = document.createElement("article");
        article.classList.add("potion-detail"); // Apply potion-detail class for horizontal layout styling

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content"); // Left-side content styling

        // Potion name
        const h2 = document.createElement("h2");
        h2.textContent = p.name;

        // Potion price
        const priceP = document.createElement("p");
        priceP.textContent = "Price: " + p.price.toFixed(2) + " leprachauns";

        // Potion color
        const colourP = document.createElement("p");
        colourP.textContent = "Colour: " + p.colour;

        // Potion effect
        const effectP = document.createElement("p");
        effectP.textContent = "Effect: " + p.effect;

        // Potion ingredients
        const ingredientsP = document.createElement("p");
        ingredientsP.textContent = "Ingredients: " + p.ingredients.join(", ");

        // Directions of use
        const directionsP = document.createElement("p");
        directionsP.textContent = "Directions: " + p.directions_of_use;

        // Caution warning
        const cautionP = document.createElement("p");
        cautionP.textContent = "Caution: " + p.caution_warning;

        // Estimated delivery time
        const deliveryP = document.createElement("p");
        deliveryP.textContent = "Estimated Delivery: " + p.estimated_delivery_time;

        // Add to Cart button
        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener("click", () => {
            if (!p.in_stock) {
                showMessage("This potion's magic reserves have been depleted and it cannot be added to your cart. Please wait for the enchantment to replenish!", "error");
            }
            else {
                addToCart(p);
                showMessage("Potion added to cart!", "success");
            }
        });

        // Append all text content to the contentDiv
        contentDiv.appendChild(h2);
        contentDiv.appendChild(priceP);
        contentDiv.appendChild(colourP);
        contentDiv.appendChild(effectP);
        contentDiv.appendChild(ingredientsP);
        contentDiv.appendChild(directionsP);
        contentDiv.appendChild(cautionP);
        contentDiv.appendChild(deliveryP);
        contentDiv.appendChild(addToCartBtn);

        // Create and append the potion image
        const img = document.createElement("img");
        img.src = IMG_PATH + p.image;
        img.alt = p.alt_text;

        // Append content and image to the article
        article.appendChild(contentDiv);
        article.appendChild(img);

        // Add "NOT IN STOCK" box if potion is out of stock
        if (!p.in_stock) {
            const notInStockDiv = document.createElement("div");
            notInStockDiv.textContent = "NOT IN STOCK";
            notInStockDiv.classList.add("not-in-stock");
            contentDiv.prepend(notInStockDiv); // Add it above all content
        }

        // Append the article to the container
        container.appendChild(article);
    }

    /**
     * Adds the potion to the cart if it is in stock.
     * @param {Object} potion - Potion object to be added to the cart.
     */
    function addToCart(potion) {
        if (!potion.in_stock) {
            showMessage("This potion's magic reserves have been depleted and it cannot be added to your cart. Please wait for the enchantment to replenish!", "error");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.name === potion.name);
        if (existing) {
            existing.quantity += 1; // Increment quantity if potion already exists in the cart
        }
        else {
            cart.push({
                name: potion.name,
                price: potion.price,
                colour: potion.colour,
                ingredients: potion.ingredients,
                image: potion.image,
                quantity: 1
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
    }

    /**
     * Displays a success or error message on the page for user feedback.
     * @param {string} message - The message to display.
     * @param {string} type - The type of message ("success" or "error").
     */
    function showMessage(message, type) {
        const messageDiv = document.getElementById("message");
        messageDiv.textContent = message;
    
        // Add appropriate class for success or error
        messageDiv.className = `message ${type}`;
        messageDiv.classList.remove("hidden"); // Show the message by removing hidden class
    
        // Hide the message after 3 seconds
        setTimeout(() => {
            messageDiv.classList.add("hidden"); // Hide the message again
            messageDiv.textContent = ""; // Clear the text content
            messageDiv.className = ""; // Reset the class for reuse
        }, 3000);
    }    

    // Load potion details on page load
    loadPotion();
})();
