/**
 * CS 132 Fall 2024, HW2 Part A
 * Name: Tanisha Agarwal
 * Date: November 4th, 2024
 *
 * This script handles the interactivity for contact & suggestion forms.
 * It listens for form submissions, displays a custom confirmation message, and
 * resets the form after submission.
 */

(function () {

    "use strict";

    // Helper function to simplify querySelector calls
    const qs = (selector) => document.querySelector(selector);

    /**
     * Sets up the event listeners for the contact form and the suggestion form.
     */
    function init() {
        const contactForm = qs("#contact-form");
        const suggestionForm = qs("#suggestion-form");

        contactForm.addEventListener("submit", handleContactForm);
        suggestionForm.addEventListener("submit", handleSuggestionForm);
    }

    /**
     * Handles the contact form submission by displaying a confirmation message
     * and clearing the form.
     * @param {Event} event - The form submission event.
     */
    function handleContactForm(event) {
        event.preventDefault();
        const name = qs("#name").value;

        const responseMessage = `Thank you, ${name}! We have received your `
            + "message and will get back to you soon!";
        const contactResponse = qs("#contact-response");
        contactResponse.textContent = responseMessage;
        contactResponse.classList.remove("hidden"); // Show response message

        // Hide the response message after 30 seconds
        setTimeout(() => contactResponse.classList.add("hidden"), 30000);

        // Reset the form to clear the input fields
        qs("#contact-form").reset();
    }

    /**
     * Handles the suggestion form submission by displaying a confirmation
     * message and clearing the form.
     * @param {Event} event - The form submission event.
     */
    function handleSuggestionForm(event) {
        event.preventDefault();
        const suggestionName = qs("#suggestion-name").value;
        const suggestionType = qs("#suggestion-type").value;

        const responseMessage = `Thank you, ${suggestionName}! We appreciate `
            + `your suggestion about '${suggestionType}'.`;
        const suggestionResponse = qs("#suggestion-response");
        suggestionResponse.textContent = responseMessage;
        suggestionResponse.classList.remove("hidden"); // Show response message

        // Hide the response message after 30 seconds
        setTimeout(() => suggestionResponse.classList.add("hidden"), 30000);

        // Reset the form to clear the input fields
        qs("#suggestion-form").reset();
    }

    init();
})();
