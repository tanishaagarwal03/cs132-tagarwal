# Mystic Brews: Final Project Proposal

## About This Proposal
This repository contains the **proposal** for the final project in CS 132 Fall 2024. The final project is to build an **e-commerce website** that showcases knowledge of HTML, CSS, JavaScript, and dynamic interactivity through APIs. This proposal outlines the concept, features, and implementation strategy for the project titled **"Mystic Brews"**.

The proposal includes:
- **Proposal PDF**: A detailed document explaining the project's goals, features, and design.
- **Wireframes**: Visual layouts for the homepage and potions pages.
- **UI Flowchart**: A user journey through the website.
- **Code Files**: HTML, CSS, and JavaScript files implementing the initial structure and interactivity for the project.

This repository demonstrates the foundation of the project, which will be extended to meet final project requirements.

---

## Overview

### Website Concept
"Mystic Brews" is an interactive e-commerce website designed to provide a magical shopping experience for fantasy and magic enthusiasts. The website offers:
- **Pre-Made Potions**: A curated selection of 15 enchanting potions with unique properties.
- **Festive Promotions**: A Christmas-themed section featuring exclusive holiday potions.
- **Interactive Features**: A planned "Brew Your Own Potion" section for customizing potions, and a personality quiz titled "Which Potion Are You?".
- **Dynamic Interactivity**: The cart icon updates dynamically when users add items, and product pages display details fetched from an API.

The website features a whimsical, magical aesthetic inspired by Edinburgh's spooky charm and my love for witchy books.

---

## Files and Features

### HTML Files
1. **`index.html` (Homepage)**:
   - Introduces the website with a carousel of potion images.
   - Highlights key sections: Pre-Made Potions, Christmas Promotions, Brew Your Own Potion, and the Quiz.
   - Contains click events for navigation to other pages.

2. **`potions.html` (Pre-Made Potions Page)**:
   - Displays 15 potions with names, descriptions, and placeholders for additional details.
   - Future plans:
     - Dynamically fetch and display potion details (ingredients, price, color, etc.) from an API.
     - Add an "Add to Cart" button to dynamically update the cart.

3. **`promotions.html` (Christmas Promotions Page)**:
   - Highlights 5 festive potions with a holiday theme, including a bundle.
   - Planned features:
     - Falling snowflake animation around the header.
     - Timer to display the remaining promotion period.
     - API integration to fetch potion details dynamically.

---

### CSS Files
1. **`styles.css`**:
   - Shared styles across the website.
   - Includes flexbox layout, custom fonts (Google Fonts), and hover effects for interactivity.
   - Defines the mystical theme with shades of purple and complementary colors.

2. **`promotions-styles.css`**:
   - Festive background.

---

### JavaScript
- **`main.js`**:
  - Implements an image slider (carousel) for the homepage.
  - Adds click events for navigation from articles to linked pages.
  - Planned features:
    - Dynamic updates for the cart when items are added.
    - Interactive animations, such as a bubbling cauldron effect.
    - Falling snowflakes and promotion timer on promotions.html

---

### Images
The `images/` folder contains product images for potions, including Christmas-themed potions. Images were sourced and edited to fit the project's magical aesthetic.

---

## Proposal-Stage Code Requirements
This project submission fulfills the requirements outlined in the proposal:
- **Two HTML Files**: `index.html` and `potions.html` with semantic tags and CSS styling.
- **Shared CSS**: General styles implemented in `styles.css`.
- **Flexbox**: Used across multiple sections for responsive design.
- **JavaScript**: Early implementation of dynamic features (e.g., carousel).

---

## Proposal Summary

### Theme and Purpose
"Mystic Brews" is a whimsical and interactive e-commerce store inspired by the magical atmosphere of Edinburgh. It combines traditional shopping with unique features like potion customization and a festive promotions section to provide a one-of-a-kind experience.

### Chosen Features
1. **Christmas Promotions Page**:
   - Highlight exclusive holiday potions with festive themes and limited-time availability.
   - Include falling snowflakes, a promotion countdown timer, and API-based details.
   
2. **Add to Cart and Checkout**:
   - Dynamically update stock levels and cart content via API.
   - Provide visual feedback when items are added to the cart.

3. **Potion Customization**:
   - Allow users to create their own potions by selecting ingredients and adjusting properties.
   - Reflect customization changes dynamically using an API.

---

## Future Enhancements
- Quiz to determine CalTech house based on potions chosen.
- Customisation of potions using JS to dynamically populate ingredients.
- Dynamic API integration to fetch and update potion details.
- Additional animations, such as bubbling cauldrons, to enhance the magical theme.
- Improved UI/UX features, such as a search filter for potions.
