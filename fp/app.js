"use strict";

const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const multer = require("multer");
const globby = require("globby");

const app = express();
const PORT = 8000;

app.use(express.json()); // Parses incoming JSON payloads
app.use(multer().none()); // Handles form-data without files
app.use(express.static("public")); // Serves static files from the "public" directory

// Error codes and messages
const CLIENT_ERR_CODE = 400;
const SERVER_ERR_CODE = 500; // Errors on the server-side
const SERVER_ERR = "For Cauldron's sake! Something spilled and set fire to everything. Please try again later.";

const DEFAULT_IMAGE = "cauldron-brewing.jpg";
const DEFAULT_ALT_TEXT = "A bubbling cauldron brewing a magical potion.";

/**
 * GET /potions
 * Retrieves all potions (including promotional ones).
 * Query parameters allow filtering by price, in_stock, animal_friendly, colour, etc.
 */
app.get("/potions", async (req, res, next) => {
    try {
        const data = await fs.readFile("potions.json", "utf8"); // Read potions data from file
        let potions = JSON.parse(data); // Parse JSON data
        potions = applyFilters(potions, req.query); // Apply query parameter filters
        res.json(potions); // Return filtered potions as JSON
    }
    catch (err) {
        res.status(SERVER_ERR_CODE); // Server error
        err.message = SERVER_ERR;
        next(err); // Pass error to the error-handling middleware
    }
});

/**
 * GET /potions/:id
 * Retrieves a specific potion by its numeric ID.
 */
app.get("/potions/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); // Parse the ID from the route parameter
        const data = await fs.readFile("potions.json", "utf8"); // Read potions data
        const potions = JSON.parse(data); // Parse JSON data

        const potion = potions.find(p => p.id === id); // Find potion by numeric ID
        if (!potion) {
            return res.status(CLIENT_ERR_CODE).json({ error: `Potion with ID "${id}" not found.` });
        }
        res.json(potion); // Return the potion as JSON
    }
    catch (err) {
        res.status(SERVER_ERR_CODE); // Server error
        err.message = SERVER_ERR;
        next(err); // Pass error to the error-handling middleware
    }
});

/**
 * Helper function to apply filters from query parameters.
 * Filters include price, in_stock, animal_friendly, colour, is_limited_edition, and is_custom.
 */
function applyFilters(items, query) {
    const { price, in_stock, animal_friendly, colour, is_limited_edition, is_custom } = query;
    let filtered = [...items]; // Create a copy of the items array

    if (price !== undefined) {
        const maxPrice = parseFloat(price); // Parse price as a number
        filtered = filtered.filter(item => item.price <= maxPrice);
    }
    if (in_stock !== undefined) {
        const stockBool = (in_stock === "true"); // Convert to boolean
        filtered = filtered.filter(item => item.in_stock === stockBool);
    }
    if (animal_friendly !== undefined) {
        const animalBool = (animal_friendly === "true"); // Convert to boolean
        filtered = filtered.filter(item => item.animal_friendly === animalBool);
    }
    if (colour) {
        filtered = filtered.filter(item =>
            item.colour.trim().toLowerCase() === colour.trim().toLowerCase()
        ); // Case-insensitive and trimmed comparison
    }
    if (is_limited_edition !== undefined) {
        const limitedEditionBool = (is_limited_edition === "true"); // Convert to boolean
        filtered = filtered.filter(item => item.is_limited_edition === limitedEditionBool);
    }
    if (is_custom !== undefined) {
        const customBool = (is_custom === "true"); // Convert to boolean
        filtered = filtered.filter(item => item.is_custom === customBool);
    }

    return filtered; // Return filtered items
}

/**
 * GET /ingredients
 * Retrieves all ingredients. Allows filtering by price.
 * Query params: price (maximum price for ingredients).
 */
app.get("/ingredients", async (req, res, next) => {
    try {
        const data = await fs.readFile("ingredients.json", "utf8"); // Read ingredients data from file
        let ingredients = JSON.parse(data); // Parse JSON data
        // Apply filtering if the `price` query parameter is present
        const { price } = req.query;
        if (price) {
            const maxPrice = parseFloat(price); // Parse price as a number
            ingredients = ingredients.filter(ingredient => ingredient.price <= maxPrice); // Filter by price
        }
        res.json(ingredients); // Return filtered ingredients as JSON
    }
    catch (err) {
        res.status(SERVER_ERR_CODE); // Server error
        err.message = SERVER_ERR;
        next(err); // Pass error to the error-handling middleware
    }
});

/**
 * GET /ingredients/:id
 * Retrieves a specific ingredient by its numeric ID.
 */
app.get("/ingredients/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); // Parse the ID from the route parameter
        const data = await fs.readFile("ingredients.json", "utf8"); // Read ingredients data
        const ingredients = JSON.parse(data); // Parse JSON data

        const ingredient = ingredients.find(i => i.id === id); // Find ingredient by ID
        if (!ingredient) {
            return res.status(CLIENT_ERR_CODE).json({ error: `Ingredient with ID "${id}" not found.` });
        }

        res.json(ingredient); // Return the ingredient as JSON
    }
    catch (err) {
        res.status(SERVER_ERR_CODE); // Server error
        err.message = SERVER_ERR;
        next(err); // Pass error to the error-handling middleware
    }
});

/**
 * GET /images
 * Retrieves a list of .png and .jpg files in the "stock-img/" directory
 * as plain text (one file name per line).
 */
app.get("/images", async (req, res, next) => {
    try {
        let imageNames = await globby("stock-img/*[png|jpg]"); // Fetch image file names
        let baseNames = imageNames.map(imageName => {
            return path.basename(imageName);
        });
        res.json(baseNames); // sets type to json and returns json
    }
    catch (err) {
        res.status(SERVER_ERR_CODE); // Server error
        err.message = SERVER_ERR;
        next(err); // Pass error to the error-handling middleware
    }
});

/**
 * POST /checkout
 * Processes the entire cart for checkout.
 * Request body must include an array of items: [{ name: string, quantity: number }].
 * Note: The server does not maintain a persistent cart. The client is expected 
 * to manage the cart in local storage and send all items for checkout in a single request.
 */
app.post("/checkout", async (req, res, next) => {
    try {
        const cart = req.body; // Extract cart array from the request body

        // Validate cart structure
        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(CLIENT_ERR_CODE).json({ error: "Cart must have at least one potion. What kind of witch are you!?" });
        }

        const data = await fs.readFile("potions.json", "utf8"); // Read potions data
        const potions = JSON.parse(data); // Parse JSON data

        let totalCost = 0; // To calculate the total cost of the order
        let unavailableItems = []; // To track items that are out of stock

        // Validate each item in the cart
        for (const item of cart) {
            const potion = potions.find(p => p.name === item.name);

            if (!potion) {
                unavailableItems.push({ name: item.name, reason: "Potion not found." });
            }
            else if (!potion.in_stock) {
                unavailableItems.push({ name: item.name, reason: "Out of stock." });
            }
            else {
                totalCost += potion.price * item.quantity; // Add to total cost
            }
        }

        // If any items are unavailable, send an error response
        if (unavailableItems.length > 0) {
            return res.status(CLIENT_ERR_CODE).json({
                error: "Some items are unavailable. We are a popular witchy website, what did you expect!",
                unavailableItems
            });
        }

        // Return order confirmation
        res.status(201).json({
            message: "Order successfully processed. A bundle of spooky somethings are coming your way soon!",
            totalCost,
            orderedItems: cart
        });
    }
    catch (err) {
        res.status(SERVER_ERR_CODE).json({ error: SERVER_ERR });
        next(err); // Pass error to the error-handling middleware
    }
});

/**
 * POST /custom_potions
 * Creates a custom potion and adds it to the cart.
 * Request body must include required fields (name, price, ingredients).
 * Optional fields (animal_friendly, colour, etc.) default to preset values if not provided.
 */
app.post("/custom_potions", async (req, res, next) => {
    try {
        const {
            name,
            price,
            ingredients,
            animal_friendly = false, // Default to false if not provided - no risky business with animals pls
            colour = "Transparent",
            directions_of_use = "Use with caution.",
            estimated_delivery_time = "5 days",
            effect = "Custom magical effect.",
            caution_warning = "None.",
            is_limited_edition = false,
            release_date = null,
            end_date = null
        } = req.body;

        // Validate fields using the helper function
        const errors = validateCustomPotionFields({
            name,
            price,
            ingredients,
            animal_friendly,
            colour,
            directions_of_use,
            estimated_delivery_time,
            effect,
            caution_warning,
            is_limited_edition,
            release_date,
            end_date
        });

        // If there are validation errors, respond with all the errors
        if (errors.length > 0) {
            return res.status(CLIENT_ERR_CODE).json({ error: errors });
        }

        // Read ingredients data
        const ingredientsData = JSON.parse(await fs.readFile("ingredients.json", "utf8"));

        // Validate ingredients and ensure sufficient stock
        let calculatedPrice = 0;
        const insufficientStock = [];
        ingredients.forEach(ingr => {
            const ingredient = ingredientsData.find(i => i.name === ingr);
            if (!ingredient) {
                insufficientStock.push({ name: ingr, reason: "Ingredient not found" });
            } 
            else if (ingredient.quantity <= 0) {
                insufficientStock.push({ name: ingr, reason: "Out of stock" });
            } 
            else {
                calculatedPrice += ingredient.price;
            }
        });

        // If any ingredient is not available
        if (insufficientStock.length > 0) {
            return res.status(CLIENT_ERR_CODE).json({
                error: "Insufficient stock for some ingredients.",
                insufficientStock
            });
        }

        // Check if the provided price matches the calculated price
        if (calculatedPrice !== price) {
            return res.status(CLIENT_ERR_CODE).json({
                error: `Price mismatch. Calculated price: ${calculatedPrice}, Provided price: ${price}.`
            });
        }

        // Decrease ingredient stock
        ingredients.forEach(ingr => {
            const ingredient = ingredientsData.find(i => i.name === ingr);
            if (ingredient) {
                ingredient.quantity -= 1; // Reduce quantity by 1
            }
        });

        // Save updated ingredients data
        await fs.writeFile("ingredients.json", JSON.stringify(ingredientsData, null, 2), "utf8");

        // Read or initialize custom potions data
        const customPotionData = await fs.readFile("custom-potion.json", "utf8").catch(() => "[]");
        const customPotion = JSON.parse(customPotionData);

        // Create the new custom potion object
        const newPotion = {
            name,
            price,
            is_custom: true,
            animal_friendly,
            colour,
            ingredients,
            directions_of_use,
            estimated_delivery_time,
            effect,
            caution_warning,
            is_limited_edition,
            release_date,
            end_date,
            image: DEFAULT_IMAGE,
            alt_text: DEFAULT_ALT_TEXT
        };

        customPotion.push(newPotion); // Add custom potion to the custom potions list
        await fs.writeFile("custom-potion.json", JSON.stringify(customPotion, null, 2), "utf8"); // Save updated custom potions data

        res.status(201).json({
            message: "Ready to create magic? Custom potion created and added to custom potions successfully!",
            potion: newPotion
        });
    } 
    catch (err) {
        res.status(SERVER_ERR_CODE).json({ error: SERVER_ERR });
        next(err);
    }
});

/**
 * Helper function to validate custom potion fields.
 * Returns an array of error messages if any validations fail.
 * Otherwise, returns an empty array.
 */
function validateCustomPotionFields(body) {
    const {
        name,
        price,
        ingredients,
        animal_friendly,
        colour,
        directions_of_use,
        estimated_delivery_time,
        effect,
        caution_warning,
        is_limited_edition,
        release_date,
        end_date
    } = body;

    let errors = [];

    // Required fields
    if (!name) {
        errors.push("Missing required field: name.");
    }
    if (price === undefined) {
        // price could be zero, but must be defined
        errors.push("Missing required field: price.");
    }
    if (!ingredients || !Array.isArray(ingredients)) {
        errors.push("Missing or invalid required field: ingredients.");
    }

    // Validate optional fields if they exist
    // Note: if a field can be undefined or is optional, only validate its type if defined
    if (animal_friendly !== undefined && typeof animal_friendly !== "boolean") {
        errors.push("Invalid field: animal_friendly (boolean).");
    }
    if (colour !== undefined && typeof colour !== "string") {
        errors.push("Invalid field: colour (string).");
    }
    if (directions_of_use !== undefined && typeof directions_of_use !== "string") {
        errors.push("Invalid field: directions_of_use (string).");
    }
    if (estimated_delivery_time !== undefined && typeof estimated_delivery_time !== "string") {
        errors.push("Invalid field: estimated_delivery_time (string).");
    }
    if (effect !== undefined && typeof effect !== "string") {
        errors.push("Invalid field: effect (string).");
    }
    if (caution_warning !== undefined && typeof caution_warning !== "string") {
        errors.push("Invalid field: caution_warning (string).");
    }
    if (is_limited_edition !== undefined && typeof is_limited_edition !== "boolean") {
        errors.push("Invalid field: is_limited_edition (boolean).");
    }
    if (release_date !== null && release_date !== undefined && typeof release_date !== "string") {
        errors.push("Invalid field: release_date (string or null).");
    }
    if (end_date !== null && end_date !== undefined && typeof end_date !== "string") {
        errors.push("Invalid field: end_date (string or null).");
    }

    return errors;
}

// Error-handling middleware
app.use((err, req, res, next) => {
    res.type("text");
    res.send(err.message); // Return error message as plain text
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mystic Brews API is running on http://localhost:${PORT}`);
});
