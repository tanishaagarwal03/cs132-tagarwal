# Creative Project 3 (CP3) - Unscramble Word Game

## Project Overview
This project, **Unscramble Word Game**, is the third creative project (CP3) for CS 132: Web Development, Fall 2024. It is an interactive game where users unscramble words based on their definitions. The game fetches words from the **Random Word API** and their definitions from the **Merriam-Webster Dictionary API**. The project demonstrates the use of **asynchronous JavaScript**, **fetch API**, and **DOM manipulation** to create an engaging user experience.

## Features
- **Dynamic Word Scrambling**: Words are scrambled using a shuffling algorithm, ensuring variety in gameplay.
- **Definition Display**: Each word is accompanied by its dictionary definition to assist the player.
- **Interactive UI**: Players can submit answers, skip words, or stop the game using intuitive buttons.
- **Error Handling**: Displays helpful feedback messages when the input is incorrect or there are fetch errors.

---

## Explanation of Key Files:
- **index.html**: The main HTML file that sets up the game structure, including the menu and game views.
- **styles.css**: The global CSS file that styles the game interface and ensures responsiveness.
- **word-unscramble.js**: The JavaScript file that handles game logic, fetch requests, error handling, and user interaction.
- **cp3-written.pdf**: The written component of CP3, demonstrating an understanding of asynchronous programming, APIs, and real-world applications.

---

## Features Implemented
- **Asynchronous API Integration**: The game uses two public APIs—Random Word API and Merriam-Webster Dictionary API—to fetch real-time data.
- **Error Handling**: Includes comprehensive error handling with user-friendly messages for failed fetch requests or invalid inputs.
- **Dynamic UI Updates**: The DOM updates dynamically with new words, definitions, and interactive elements as the game progresses.
- **Custom CSS Styling**: A responsive design with animations for button hover effects and color transitions when correctly unscrambled.
- **Game Control Options**: Includes submit, skip, and stop buttons to give players full control over the game.

---

## Future Work and Improvements
- **Score Tracking**: Adding a scoring system to make the game more competitive and engaging.
- **Timer**: Adding a timer would make this a proper game.
- **Hint System**: Implementing a feature to give users a hint for unscrambling the word instead of just showing the definition.
- **Leaderboard**: Storing high scores locally or online to allow players to compare their performance.
- **Offline Mode**: Adding a fallback for offline play with a predefined list of words and definitions.

---

This project is part of CS 132 and was submitted via GitHub and CodePost. The repository is private and intended for grading purposes.
