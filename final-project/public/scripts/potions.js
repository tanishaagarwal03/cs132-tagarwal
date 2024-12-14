/**
 * Name: Tanisha Agarwal
 * Date: December 14th, 2024
 *
 * Description:
 * This script dynamically loads and displays premade potions on the potions page of the Mystic Brews website.
 * Users can filter potions based on price and stock availability using a filter form.
 * Key functionalities:
 * - Fetch and display premade potions from the server.
 * - Allow users to filter potions using price and in-stock status.
 * - Mark potions as "NOT IN STOCK" if unavailable.
 * - Navigate to potion detail pages by clicking on individual potion articles.
 * - Handle errors gracefully with a magical error message if the potions fail to load.
 */

(function () {
    "use strict";

    // Base URLs and element selectors
    const BASE_URL = "/";
    const PREMADE_POTIONS_URL = BASE_URL + "potions?is_limited_edition=false"; // API endpoint for premade potions - premade potions are essentially non limited edition ones
    const IMG_PATH = "images/"; // Path to potion images
    const potionsContainer = document.getElementById("potions-container"); // Container for displaying potions
    const filterForm = document.getElementById("filter-form"); // Filter form element

    /**
     * Loads potions from the server and displays them in the potions container.
     * @param {Object} queryParams - Optional filters for fetching potions.
     */
    async function loadPotions(queryParams = {}) {
        let url = PREMADE_POTIONS_URL;
        const params = new URLSearchParams();

        // Add filters to the query parameters if provided
        if (queryParams.price) {
            params.append("price", queryParams.price);
        }
        if (queryParams.in_stock) {
            params.append("in_stock", "true");
        }

        if ([...params].length > 0) {
            url += "&" + params.toString();
        }

        try {
            // Fetch potions data from the API
            const resp = await fetch(url);
            if (!resp.ok) throw new Error("Failed to fetch potions");
            const potions = await resp.json();

            // Display the fetched potions
            displayPotions(potions);
        } 
        catch (error) {
            potionsContainer.textContent = "Oh no! The magic seems to have fizzled out, and we couldn't fetch your potions. Please try casting the spell again!";
        }
    }

    /**
     * Dynamically generates and displays potions as articles in the potions container.
     * @param {Array} potions - List of potion objects to display.
     */
    function displayPotions(potions) {
        potionsContainer.innerHTML = ""; // Clear any previous content

        // Loop through each potion and create an article for each potion
        potions.forEach(p => {
            const article = document.createElement("article");
            article.classList.add("potion");

            // Create and append the image
            const fig = document.createElement("figure");
            const img = document.createElement("img");
            img.src = IMG_PATH + p.image;
            img.alt = p.alt_text;
            fig.appendChild(img);

            // Create and append the potion name
            const h3 = document.createElement("h3");
            h3.textContent = p.name;

            // Create and append the price
            const priceP = document.createElement("p");
            priceP.textContent = "Price: " + p.price.toFixed(2) + " leprachauns";

            // Create and append the effect of the potion
            const effectP = document.createElement("p");
            effectP.textContent = p.effect;

            // Add elements to the article
            article.appendChild(fig);
            article.appendChild(h3);
            article.appendChild(priceP);
            article.appendChild(effectP);

            // Add "NOT IN STOCK" box if the potion is out of stock
            if (!p.in_stock) {
                const stockNotice = document.createElement("div");
                stockNotice.textContent = "NOT IN STOCK";
                stockNotice.classList.add("out-of-stock");
                article.appendChild(stockNotice);
            }

            // Make the article clickable to navigate to the potion's detail page
            article.addEventListener("click", () => {
                window.location.href = "potion-detail.html?id=" + p.id;
            });

            // Append the article to the potions container
            potionsContainer.appendChild(article);
        });
    }

    /**
     * Handles form submission to filter potions based on user input.
     * @param {Event} e - The form submission event.
     */
    function handleFilterSubmit(e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get filter values from the form
        const formData = new FormData(filterForm);
        const queryParams = {};
        if (formData.get("price")) {
            queryParams.price = formData.get("price");
        }
        if (formData.get("in_stock")) {
            queryParams.in_stock = true;
        }

        // Reload potions with the applied filters
        loadPotions(queryParams);
    }

    /**
     * Initializes the application by setting up event listeners and loading initial data.
     */
    function init() {
        // Add event listener for the filter form submission
        filterForm.addEventListener("submit", handleFilterSubmit);
        // Load potions without filters on initial page load
        loadPotions();
    }

    // Run the init function to start the application
    init();
})();
