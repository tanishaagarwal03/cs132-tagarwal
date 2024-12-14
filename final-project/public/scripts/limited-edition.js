/**
 * Name: Tanisha Agarwal
 * Date: December 14, 2024
 * 
 * This JavaScript file dynamically populates the "Limited Edition Potions" page of the "Mystic Brews" project.
 * The page showcases limited-edition potions, fetching data from the backend API. 
 * Key Features:
 * - Fetches and displays limited edition potions with their details, including price, name, and magical effects.
 * - Highlights potions that are out of stock with a "NOT IN STOCK" indicator.
 * - Displays a countdown timer for potions with a limited-time availability.
 * - Allows users to click on a potion to navigate to its detailed page.
 * 
 * This script includes:
 * - Asynchronous API calls to fetch limited edition potions.
 * - Dynamic DOM manipulation to display potion details.
 * - A countdown timer to show potion availability duration.
 * - Error handling with user-friendly magical error messages.
 */

(function () {
    "use strict";

    // Constants for API URL and image path
    const BASE_URL = "/";
    const LIMITED_ED_URL = BASE_URL + "potions?is_limited_edition=true"; // Endpoint for fetching limited edition potions
    const IMG_PATH = "images/"; // Path to the images directory

    // Container to display the list of limited edition potions
    const container = document.getElementById("limited-container");

    /**
     * Fetches the list of limited edition potions from the API and displays them.
     */
    async function loadLimitedEditionPotions() {
        try {
            const resp = await fetch(LIMITED_ED_URL); // Fetch data from the API
            if (!resp.ok) {
                // Throw an error if the response is not OK
                throw new Error("Oh no! The magic seems to have fizzled out, and we couldn't fetch your potions. Please try casting the spell again!");
            }
            const potions = await resp.json(); // Parse the JSON response
            displayPotions(potions); // Display the fetched potions
        } 
        catch (error) {
            // Handle any errors during the fetch process
            container.textContent = "Oh no! The magic seems to have fizzled out, and we couldn't fetch your potions. Please try casting the spell again (refresh the page)!";
        }
    }

    /**
     * Dynamically generates and displays potions in the container.
     * @param {Array} potions - List of potion objects to display.
     */
    function displayPotions(potions) {
        container.innerHTML = ""; // Clear any previous content

        // Iterate through each potion and create its display elements
        potions.forEach(p => {
            const article = document.createElement("article");
            article.classList.add("potion"); // Add styling class to the article

            // Create and append the potion image
            const fig = document.createElement("figure");
            const img = document.createElement("img");
            img.src = IMG_PATH + p.image;
            img.alt = p.alt_text;
            fig.appendChild(img);

            // Add "NOT IN STOCK" indicator if the potion is out of stock
            if (!p.in_stock) {
                const notInStockDiv = document.createElement("div");
                notInStockDiv.textContent = "NOT IN STOCK";
                notInStockDiv.classList.add("not-in-stock");
                article.appendChild(notInStockDiv);
            } 
            // Add countdown if the potion is in stock and has a limited availability
            else if (p.end_date) {
                const countdownP = document.createElement("p");
                countdownP.classList.add("countdown"); // Add styling class for the countdown
                article.appendChild(countdownP);
                startCountdown(p.end_date, countdownP); // Start the countdown timer
            }

            // Create and append the potion name
            const h3 = document.createElement("h3");
            h3.textContent = p.name;

            // Create and append the potion price
            const priceP = document.createElement("p");
            priceP.textContent = "Price: " + p.price.toFixed(2) + " leprachauns";

            // Create and append the potion effect
            const effectP = document.createElement("p");
            effectP.textContent = p.effect;

            // Append all elements to the article
            article.appendChild(fig);
            article.appendChild(h3);
            article.appendChild(priceP);
            article.appendChild(effectP);

            // Make the article clickable, navigating to the potion's detail page
            article.addEventListener("click", () => {
                window.location.href = "potion-detail.html?id=" + p.id;
            });

            // Append the article to the container
            container.appendChild(article);
        });
    }

    /**
     * Starts a countdown timer for potions with limited availability.
     * @param {string} endDateStr - The end date of the potion's availability.
     * @param {HTMLElement} el - The element to display the countdown timer.
     */
    function startCountdown(endDateStr, el) {
        const endDate = new Date(endDateStr); // Parse the end date
        const interval = setInterval(() => {
            const now = new Date(); // Get the current time
            const diff = endDate - now; // Calculate the time difference
            if (diff <= 0) {
                // If the countdown ends, display "Offer ended!" and clear the interval
                el.textContent = "Offer ended!";
                clearInterval(interval);
                return;
            }
            // Calculate days, hours, minutes, and seconds remaining
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            // Display the countdown timer
            el.textContent = `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000); // Update every second
    }

    // Load the limited edition potions on page load
    loadLimitedEditionPotions();
})();
