/**
 * CS 132 Fall 2024, Project - Exploring Edinburgh
 * Name: Tanisha Agarwal
 * Date: November 4th, 2024
 *
 * Overview: This script sets up interactivity for multiple features:
 * - Card flip interactions on the attractions, cafes, and nightlife pages.
 * - Filtering functionality on cafes, nightlife pages based on options.
 * - Dynamic feedback on the number of visible items after filtering.
 * - Homepage click event to navigate users to pages when clicking on articles.
 * - Image slider on the homepage that automatically transitions images and
 *   provides navigation controls for manual movement.
 *
 * The addCardFlipListener function adds a click event listener to each card,
 * enabling toggling between front and back views.
 * The filterCafes and filterNightlife functions filter displayed items based
 * on selected options, with feedback showing the number of visible items.
 * The addHomepageClickListener function makes articles on the homepage
 * clickable for easy navigation.
 * The startSlider function initiates an image slider with automatic
 * controls to cycle through images.
 */

(function () {
    "use strict";

    // Helper function to simplify querySelector calls
    const qs = (selector) => document.querySelector(selector);
    const qsa = (selector) => document.querySelectorAll(selector);

    /**
     * Adds a click event listener to each card element to toggle the 'flipped'
     * class. This allows cards to switch between front & back views.
     */
    function addCardFlipListener() {
        // Select all elements with the class "card"
        const cards = qsa(".card");

        // Add a click event listener to each card
        cards.forEach(function (card) {
            card.addEventListener("click", function () {
                // Toggle the 'flipped' class on click
                card.classList.toggle("flipped");
            });
        });
    }

    /**
     * Sets up the event listener for the cuisine filter dropdown menu.
     * When a cuisine is selected, the filterCafes function filters displayed
     * cafes and restaurants, and the displayFilterFeedback function shows
     * the number of visible items.
     */
    function addCuisineFilterListener() {
        // Select the cuisine filter dropdown menu
        const cuisineFilterDropdown = qs("#cuisine-filter");
        if (cuisineFilterDropdown) {
            cuisineFilterDropdown.addEventListener("change", filterCafes);
        }
    }

    /**
     * Filters cafes and restaurant items based on the selected cuisine type.
     * Shows only those items that match the selected cuisine or all items if
     * "All" is selected. Also provides feedback on the number of visible items.
     */
    function filterCafes() {
        // Get the selected cuisine value from the dropdown
        const selectedCuisine = qs("#cuisine-filter").value;
        // Select all cafe cards with a "data-cuisine" attribute
        const cafes = qsa(".card[data-cuisine]");
        let visibleCount = 0; // Initialize counter for visible items

        // Loop through each cafe card to apply the filter
        cafes.forEach(function (cafe) {
            // Get the list of cuisines for the current cafe
            const cafeCuisines = cafe.getAttribute("data-cuisine")
                .toLowerCase()
                .split(" ");

            // Show or hide the cafe based on selected cuisine
            if (selectedCuisine === "all"
                        || cafeCuisines.includes(selectedCuisine)) {
                cafe.classList.remove("hidden"); // Show matching cafe
                visibleCount += 1; // Increase visible count
            }
            else {
                cafe.classList.add("hidden"); // Hide non-matching cafe
            }
        });

        // Display feedback with the count of visible items
        displayFilterFeedback(visibleCount);
    }

    /**
     * Sets up the event listener for the nightlife filter dropdown menu.
     * When a nightlife type is selected, the filterNightlife function filters
     * displayed nightlife items, and the displayFilterFeedback function shows
     * the number of visible items.
     */
    function addNightlifeFilterListener() {
        // Select the nightlife filter dropdown menu
        const nightlifeDropdown = qs("#nightlife-filter");

        if (nightlifeDropdown) {
            nightlifeDropdown.addEventListener("change", filterNightlife);
        }
    }

    /**
     * Filters nightlife items based on the selected nightlife type.
     * Shows only those items that match the selected type or all items if
     * "All" is selected.
     */
    function filterNightlife() {
        // Get the selected type from the dropdown
        const selectedType = qs("#nightlife-filter").value;
        // Select all nightlife cards with a "data-nlife" attribute
        const nightlifeItems = qsa(".card[data-nlife]");
        let visibleCount = 0; // Initialize counter for visible items

        // Loop through each nightlife item to apply the filter
        nightlifeItems.forEach(function (item) {
            // Get the type of the current nightlife item
            const itemType = item.getAttribute("data-nlife").toLowerCase();

            // Show or hide the item based on the selected type
            if (selectedType === "all" || itemType === selectedType) {
                item.classList.remove("hidden"); // Show matching item
                visibleCount += 1; // Increase visible count
            }
            else {
                item.classList.add("hidden"); // Hide non-matching item
            }
        });

        // Display feedback with the count of visible items
        displayFilterFeedback(visibleCount);
    }

    /**
     * Updates feedback section to show number of visible items after filtering.
     * Uses replaceChild to update the feedback dynamically.
     * @param {number} count - The count of visible items after filtering.
     */
    function displayFilterFeedback(count) {
        // Select the feedback div to display the count message
        const feedbackDiv = qs("#filter-feedback");

        // Create a new paragraph element for the feedback message
        const newFeedbackMessage = document.createElement("p");
        // Set text content based on the count, with singular/plural handling
        newFeedbackMessage.textContent = (
            "(" + count + " item" + (count !== 1 ? "s" : "") + " found)"
        );
        // Check if feedback div already has existing feedback message
        if (feedbackDiv.firstChild) {
            // Replace existing message with the new one if it already exists
            feedbackDiv.replaceChild(
                newFeedbackMessage,
                feedbackDiv.firstChild
            );
        }
        else {
            // Add new message if none exists
            feedbackDiv.appendChild(newFeedbackMessage);
        }
    }

    /**
     * Adds a click event listener to each article on the homepage's "Top Things
     * to Do" section. Clicking an article navigates the user to the respective
     * linked page. The article’s cursor changes to indicate it is clickable.
     */
    function addHomepageClickListener() {
        // Select all articles in the "Top Things to Do" section
        const articles = qsa("main .top-things article");

        // Add a click event listener to each article to navigate to the link
        articles.forEach(function (article) {
            const link = article.querySelector("a");
            if (link) {
                const href = link.getAttribute("href");

                // Navigate to the linked page on click
                article.addEventListener("click", function () {
                    window.location.href = href;
                });

                // Change cursor to pointer to indicate clickable article
                article.style.cursor = "pointer";
            }
        });
    }

    /**
     * Sets up an automatic, continuously scrolling slider for images within the
     * .carousel-images container. It creates a seamless looping effect by
     * resetting the position of the images once half of the total scroll width
     * has been scrolled.
     */
    function startSlider() {
        // Select the carousel images container
        const carouselImages = qs(".carousel-images");
        let position = 0; // Initialize the starting position of the slider
        const speed = 1.5; // Set the speed of the scrolling effect (px/frame)

        /**
         * Continuously scrolls the images to the left by updating the position
         * Resets position to create loop once 1/2 of total width is scrolled
         */
        function animateSlider() {
            position -= speed; // Move position to the left by the speed value
            // Check if position has scrolled past 1/2 of total width of images
            if (Math.abs(position) >= carouselImages.scrollWidth / 2) {
                position = 0; // Reset position for seamless loop
            }
            // Apply updated position as transform to create scrolling effect
            carouselImages.style.transform = `translateX(${position}px)`;
            // Call animateSlider for next frame
            requestAnimationFrame(animateSlider);
        }
        animateSlider(); // Start the animation loop
    }

    /**
     * Initializes the page by setting up interactivity for:
     * - Card flips on attractions, cafes, and nightlife pages.
     * - Filtering based on selected options on cafes and nightlife pages.
     * - Click interactions on homepage articles for easy navigation.
     * - Automatic and manual image slider on the homepage.
     */
    function init() {
        addHomepageClickListener(); // Initialize click listeners on homepage
        addCardFlipListener(); // Set up card flipping functionality
        addCuisineFilterListener(); // Set up cuisine filter functionality
        addNightlifeFilterListener(); // Set up nightlife filter functionality
        startSlider(); // Start the automatic image slider
    }

    init(); // Run the init function to initialize all interactive features
})();
