/* 
  Name: Tanisha Agarwal
  Date: December 14, 2024
  
  This script powers the "Brew Your Potion" page for the Mystic Brews project.
  Users can:
  - Select ingredients to create a custom potion.
  - Input potion name and colour.
  - Dynamically calculate and display the total price of selected ingredients.
  - Submit their custom potion to the backend API for saving and add it to their cart.

  Key Features:
  - Dynamic ingredient loading from the backend API.
  - Validation for missing fields or ingredients.
  - Real-time UI updates as users select or remove ingredients.
  - Error and success messages for user actions.
  - LocalStorage-based cart functionality for storing user-added potions.

  Future Features:
  - Enhanced interactivity for ingredient selection.
  - Support for user profiles to save potion recipes.
  - Bubbling cauldron
*/

(function () {
    "use strict";

    // Constants for API endpoints
    const BASE_URL = "/";
    const ING_URL = BASE_URL + "ingredients"; // API endpoint to fetch ingredients
    const CUST_POTION_URL = BASE_URL + "custom_potions"; // API endpoint for submitting custom potions

    // Constants for DOM elements
    const ingredientsSelect = document.getElementById("ingredients-select"); // Dropdown for ingredients
    const ingredientList = document.getElementById("ingredient-list"); // List of selected ingredients
    const totalPriceEl = document.getElementById("total-price"); // Element displaying the total price
    const brewForm = document.getElementById("brew-form"); // Form for brewing potions

    // Error message placeholder
    const ingredientError = document.getElementById("ingredient-error");

    // State variables
    let ingredientsData = []; // All available ingredients
    let selectedIngredients = []; // Currently selected ingredients
    let totalPrice = 0; // Total price of selected ingredients

    /**
     * Fetches the list of ingredients from the backend API.
     */
    async function loadIngredients() {
        try {
            const resp = await fetch(ING_URL);
            if (!resp.ok) throw new Error("Oh no! The magic seems to have fizzled out, and we couldn't fetch your ingredients. Please try casting the spell again (refresh the page)!");
            ingredientsData = await resp.json();
            populateIngredientsDropdown();
        }
        catch (error) {
            // Display an error message in the ingredient error placeholder
            ingredientError.textContent = "Oh no! The magic fizzled out while fetching your ingredients. Please refresh the page!";
        }
    }

    /**
     * Populates the ingredient dropdown with data from the API.
     */
    function populateIngredientsDropdown() {
        ingredientsSelect.innerHTML = ""; // Clear any previous options
        ingredientsData.forEach(i => {
            const opt = document.createElement("option");
            opt.value = i.name;
            opt.textContent = `${i.name} (${i.price.toFixed(2)} leprachauns)`;
            ingredientsSelect.appendChild(opt);
        });
    }

    /**
     * Updates the UI to display selected ingredients and total price.
     */
    function updateSelectedIngredients() {
        ingredientList.innerHTML = ""; // Clear previous list
        selectedIngredients.forEach((ingredient, index) => {
            const li = document.createElement("li");
            li.textContent = `${ingredient.name} (${ingredient.price.toFixed(2)} leprachauns)`;

            // Add remove button for each ingredient
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-ingredient-btn");
            removeBtn.addEventListener("click", () => {
                removeIngredient(index);
            });

            li.appendChild(removeBtn);
            ingredientList.appendChild(li);
        });
        totalPriceEl.textContent = totalPrice.toFixed(2); // Update total price
    }

    /**
     * Removes an ingredient from the selected list and updates the UI.
     * @param {number} index - Index of the ingredient to remove.
     */
    function removeIngredient(index) {
        totalPrice -= selectedIngredients[index].price;
        selectedIngredients.splice(index, 1);
        updateSelectedIngredients();
    }

    /**
     * Validates the form before submission.
     * @param {string} name - The potion's name.
     * @param {string} colour - The potion's colour.
     * @returns {boolean} - Whether the form is valid.
     */
    function validateForm() {
        let valid = true;

        // Clear previous error message
        ingredientError.textContent = "";

        // Check if at least one ingredient is selected
        if (selectedIngredients.length === 0) {
            ingredientError.textContent = "Please select at least one ingredient.";
            valid = false;

            // Remove the error message after 2 seconds
            setTimeout(() => {
                ingredientError.textContent = "";
            }, 3000);
        }

        return valid;
    }

    /**
     * Handles the form submission, sending the custom potion to the backend.
     * @param {Event} e - The form submission event.
     */
    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData(brewForm);
        const name = formData.get("name").trim();
        const colour = formData.get("colour").trim();

        // Validate form fields
        if (!validateForm()) 
            return;

        // Create the potion object to send
        const body = {
            name,
            price: totalPrice,
            ingredients: selectedIngredients.map(ingr => ingr.name),
            colour
        };

        try {
            const resp = await fetch(CUST_POTION_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!resp.ok) {
                const errorData = await resp.json();
                throw new Error(errorData.error || "Failed to create potion");
            }

            const data = await resp.json();

            // Add to cart and reset the form
            addToCart(data.potion);
            showMessage("Potion created and added to cart!", "success");
            resetForm();
        }
        catch (error) {
            showMessage(`Error: ${error.message}`, "error");
        }
    }

    /**
     * Adds the potion to the cart stored in localStorage.
     * @param {Object} potion - The potion object to add to the cart.
     */
    function addToCart(potion) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Create a unique identifier for custom potions
        const potionIdentifier = JSON.stringify({
            name: potion.name,
            colour: potion.colour,
            ingredients: potion.ingredients.sort() // Sort to avoid order mismatch issues
        });

        // Check if the potion already exists in the cart
        const existing = cart.find(item => item.identifier === potionIdentifier);

        if (existing) {
            // If the potion exists, increase its quantity
            existing.quantity += 1;
        } 
        else {
            // If it's a new potion, add it to the cart
            cart.push({
                identifier: potionIdentifier, // Add unique identifier
                name: potion.name,
                price: potion.price,
                colour: potion.colour,
                ingredients: potion.ingredients,
                image: potion.image,
                quantity: 1
            });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    /**
     * Resets the form and clears the selected ingredients and errors.
     */
    function resetForm() {
        brewForm.reset(); // Clear form inputs
        selectedIngredients = []; // Clear ingredient selection
        totalPrice = 0; // Reset total price
        updateSelectedIngredients(); // Update UI
        ingredientError.textContent = ""; // clear errors
    }

    /**
     * Displays a success or error message to the user.
     * @param {string} message - The message to display.
     * @param {string} type - The type of message ("success" or "error").
     */
    function showMessage(message, type) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
        messageDiv.textContent = message;
        brewForm.prepend(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    /**
     * Initializes the script by loading ingredients and setting up event listeners.
     */
    function init() {
        loadIngredients();

        // Add event listener to the Add Ingredient button
        document.getElementById("add-ingredient-btn").addEventListener("click", () => {
            const ingrName = ingredientsSelect.value;
            const ingr = ingredientsData.find(i => i.name === ingrName);
            if (ingr) {
                selectedIngredients.push(ingr);
                totalPrice += ingr.price;
                updateSelectedIngredients();
            }
        });

        // Add event listener to the form
        brewForm.addEventListener("submit", submitForm);
    }

    // Start the application
    init();
})();
