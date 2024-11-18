# Creative Project 2 (CP2) - Exploring Edinburgh

## Project Overview
This project, **Exploring Edinburgh**, is the second creative project (CP2) for CS 132: Web Development, Fall 2024. It expands on CP1 by introducing JavaScript interactivity to enhance user engagement and interactivity. The project continues to highlight Edinburgh's key attractions, cafes, restaurants, nightlife spots, and includes additional user-friendly features like card flipping, dynamic filtering, and a custom image slider.

**Score**: 9/9

## Features
### New Interactive Features in CP2
- **Card Flip Interactions**: Each card on the attractions, cafes, and nightlife pages can be clicked to flip, showing additional information on the reverse side.
- **Dynamic Filtering**: Filtering options allow users to filter cafes by cuisine type and nightlife by category, with a live count of visible items displayed after each filter selection.
- **Homepage Image Slider**: A custom image slider on the homepage automatically transitions through images, showcasing highlights of Edinburgh.
- **Contact & Suggestion Forms**: JavaScript-enabled forms on the contact page provide instant feedback upon submission, preventing page refresh and displaying a custom confirmation message.

### Core HTML & CSS Features from CP1
- **Multi-Page Structure**: The website continues to include pages for Attractions, Cafes & Restaurants, Nightlife, and Contact, each styled uniquely but consistently with a shared theme.
- **Responsive Design**: With Flexbox and media queries, the layout adapts to different screen sizes, offering a seamless experience across devices.

## Explanation of Key Files
- **index.html**: The homepage with an image slider and a brief introduction to the website content.
- **attractions.html**: A page featuring top tourist attractions in Edinburgh, with interactive card flipping.
- **cafes.html**: A page showcasing recommended cafes and restaurants with cuisine filtering.
- **nightlife.html**: A guide to nightlife venues with category-based filtering.
- **contact.html**: A contact page with forms that provide user feedback upon submission.
  
### JavaScript Files
- **scripts/main.js**: Main JavaScript file implementing card flips, filtering functionality, homepage click events, and an image slider.
- **scripts/contacts.js**: Manages interactivity for the contact and suggestion forms, handling form submission, display of confirmation messages, and form reset.
- **cp2 javascript table.pdf**: A document detailing the JavaScript interactions in CP2, outlining each event type, triggered element, and corresponding action.


### CSS Files
- **styles.css**: Global styles applied across all pages.
- **index-styles.css**: Specific styles for the homepage layout.
- **cafes-styles.css**: Custom styles for the Cafes & Restaurants page, integrating filter functionality.
- **nightlife-styles.css**: Unique styles for the Nightlife page with category filters.
- **contact-styles.css**: Contact page-specific styling, including form layout.
- **dom-tree.pdf**: Updated DOM tree reflecting additions for the new interactive elements.

## Semantic HTML
This project continues to use **semantic HTML5** tags to maintain accessibility, improve SEO, and enhance the structure and readability of the code.

## JavaScript Interactivity
The JavaScript in this project enables the following key interactions:
- **Flipping Cards**: Cards on Attractions, Cafes, and Nightlife pages can be flipped to reveal additional information on the back.
- **Filtering Items**: Filtering options allow users to customize visible items based on their interests (e.g., cuisine type for cafes).
- **Image Slider**: The homepage image slider dynamically cycles through images to showcase Edinburgh highlights.
- **Form Feedback**: The Contact page forms provide instant feedback, preventing page refresh with `preventDefault()` and displaying a confirmation message for 30 seconds.

## Reflection Document
The `cp2-reflection.pdf` file discusses the process of adding JavaScript interactivity, handling user feedback, and debugging. It also covers any challenges encountered, particularly with asynchronous JavaScript and DOM manipulation, as well as strategies for future improvements.

## Future Work and Improvements
- **Additional Filtering Options**: Potential for filters by price range or family-friendly options.
- **User Reviews**: Exploring options for allowing users to leave reviews or rate attractions and restaurants.
- **Favorites Feature**: Developing functionality for users to “favorite” specific attractions or cafes, allowing them to save and revisit their selections.

This project builds on the foundation set by CP1 and continues to be part of CS 132, submitted via GitHub and CodePost for grading.
