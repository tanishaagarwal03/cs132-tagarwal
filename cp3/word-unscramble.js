/**
 * Author: Tanisha Agarwal
 * CS 132 Fall 2024
 * Date: 5th December, 2024
 *
 * This is the JavaScript file for my Unscramble Word Game project.
 * It dynamically fetches words using Random Word API and definitions using Dictionary API,
 * handles user interaction, and updates the game interface accordingly.
 */

(function () {
    "use strict";
    const RANDOM_WORD_URL = "https://random-word-api.herokuapp.com/word";
    const DEFN_URL_BASE = "https://www.dictionaryapi.com/api/v3/references/sd4/json/";
    const API_KEY = "?key=e5c0d5a8-8f5e-4d73-8b8b-26071219cb1d";
    let currentWord = null;
    let scrambledWord = null;
    let errorTimeout = null; // To track the timeout for the error message

    /**
     * Initializes the event listeners for the buttons.
     */
    function init() {
        id("start-btn").addEventListener("click", startGame);
        id("submit-btn").addEventListener("click", checkAnswer);
        id("skip-btn").addEventListener("click", skipWord);
        id("stop-btn").addEventListener("click", stopGame);
    }

    /**
     * Fetches a random word and its definition, then updates the game interface.
     * If the word does not have a valid definition, fetches a new word.
     */
    async function fetchWordWithDefinition() {
        try {
            // Clear any previously displayed error messages
            clearErrorMessage();
        
            let wordWithDefFound = false; // Flag to track if a valid word with a definition has been found
        
            // Loop until a word with a valid definition is found
            while (!wordWithDefFound) {
                // Fetch a random word from the Random Word API
                const wordResp = await fetch(RANDOM_WORD_URL);
                checkStatus(wordResp); // Check if the response status is valid
                const words = await wordResp.json(); // Parse the response as JSON
                currentWord = words[0]; // Extract the first word from the response
        
                // Fetch the definition of the current word from the Dictionary API
                const defResp = await fetch(`${DEFN_URL_BASE}${currentWord}${API_KEY}`);
                checkStatus(defResp); // Check if the response status is valid
                const defJson = await defResp.json(); // Parse the response as JSON
        
                // Check if the word has a valid definition
                if (defJson[0]?.shortdef) {
                    wordWithDefFound = true; // Set the flag to true if a valid definition is found
                    scrambledWord = scrambleWord(currentWord); // Scramble the current word
                    id("scrambled-word").textContent = scrambledWord; // Display the scrambled word
                    id("defn-text").textContent = defJson[0].shortdef.join("; "); // Display the definition
                }
            }
        } 
        catch (err) {
            // Handle any errors that occur during the fetch or processing
            handleError(err);
        }        
    }

    /**
     * Starts the game by removing the start button and showing the game view.
     */
    function startGame() {
        id("start-btn").remove(); // Remove the Start button
        id("menu-view").classList.add("hidden");
        id("game-view").classList.remove("hidden");
        fetchWordWithDefinition();
    }

    /**
     * Checks if the user's input matches the current word.
     * If correct, advances to the next word. Otherwise, shows an error message.
     */
    function checkAnswer() {
        const userInput = id("user-input").value.trim().toLowerCase();
        const body = document.body;

        if (userInput === currentWord) {
            clearErrorMessage();
            body.classList.add("correct-answer");
            setTimeout(() => {
                body.classList.remove("correct-answer");
                fetchWordWithDefinition();
                id("user-input").value = "";
            }, 1000);
        } 
        else {
            showErrorMessage("Incorrect! Try again.");
        }
    }

    /**
     * Skips the current word, displaying the correct word temporarily,
     * and then advances to the next word.
     */
    function skipWord() {
        id("scrambled-word").textContent = currentWord;

        // Fetch the next word after a short delay
        setTimeout(() => {
            fetchWordWithDefinition();
            id("user-input").value = "";
        }, 1000);
    }

    /**
     * Stops the game by disabling all interactive elements.
     */
    function stopGame() {
        id("user-input").disabled = true;
        id("submit-btn").disabled = true;
        id("skip-btn").disabled = true;
        id("stop-btn").disabled = true;
    }

    /**
     * Scrambles the letters of a word using the Fisher-Yates shuffle.
     * @param {string} word - The word to be scrambled.
     * @returns {string} - The scrambled version of the word.
     */
    function scrambleWord(word) {
        const letters = word.split(""); // Convert the word to an array of characters
        for (let i = letters.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i
            const j = Math.floor(Math.random() * (i + 1));
            // Swap letters[i] with letters[j]
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        return letters.join(""); // Join the array back into a string
    }

    /**
     * Displays an error message on the page for a limited duration.
     * @param {string} message - The error message to display.
     */
    function showErrorMessage(message) {
        const errorMsg = id("error-msg");
        errorMsg.textContent = message; // Set the error message text
        errorMsg.classList.remove("hidden"); // Remove the hidden class to show the message

        // Hide the message after 2 seconds
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }
        errorTimeout = setTimeout(() => {
            errorMsg.classList.add("hidden"); // Add the hidden class to hide the message
        }, 2000);
    }

    /**
     * Hides the error message and clears any active timeout.
     */
    function clearErrorMessage() {
        const errorMsg = id("error-msg");
        errorMsg.classList.add("hidden");
        if (errorTimeout) {
            clearTimeout(errorTimeout); // Clear any existing timeout
            errorTimeout = null;
        }
    }
    
    /**
     * Handles errors that occur during the fetch process.
     * Displays an alert with the error message.
     * @param {Error} err - The error object to handle.
     */
    function handleError(err) {
        alert("An error occurred: " + err.message);
    }

    /**
     * Validates the response from a fetch request.
     * Throws an error if the response status is not ok.
     * @param {Response} response - The fetch response object.
     * @returns {Response} - The original response if valid.
     * @throws {Error} - If the response status is not ok.
     */
    function checkStatus(response) {
        if (!response.ok) {
            throw new Error("Error: " + response.statusText);
        }
        return response;
    }

    /**
     * Retrieves an HTML element by its ID.
     * @param {string} idName - The ID of the element to retrieve.
     * @returns {HTMLElement} - The DOM element with the specified ID.
     */
    function id(idName) {
        return document.getElementById(idName);
    }

    init();
})();
