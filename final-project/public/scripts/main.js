/**
 * CS 132 Fall 2024, Mystic Brews Project
 * Name: Tanisha Agarwal
 * Date: December 13th, 2024
 *
 * Overview:
 * This script implements interactivity for "Mystic Brews" project, focusing on:
 * - Homepage navigation through clickable articles in "Discover the Magic".
 * - A seamless image carousel on the homepage that continuously scrolls images
 *   and creates a smooth, looping effect.
 */

(function () {
    "use strict";

    // Helper function to simplify querySelector calls
    const qs = (selector) => document.querySelector(selector);
    const qsa = (selector) => document.querySelectorAll(selector);

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
     * Adds a click event listener to each article on the homepage's "Discover
     * the Magic" section. Clicking article navigates the user to the respective
     * linked page. The article’s cursor changes to indicate it is clickable.
     */
    function addHomepageClickListener() {
        // Select all articles in the "Top Things to Do" section
        const articles = qsa("main .magic-links article");

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
     * Initializes the page by setting up interactivity for:
     * - Automatic and manual image slider on the homepage.
     */
    function init() {
        addHomepageClickListener(); // Initialize click listeners on homepage
        startSlider(); // Start the automatic image slider
    }

    init(); // Run the init function to initialize all interactive features
})();
