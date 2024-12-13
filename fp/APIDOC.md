# Mystic Brews API Documentation

Welcome to the Mystic Brews API! This API provides access to a magical potions and ingredients store, allowing you to browse enchanted potions, query rare ingredients, and even create custom brews. Whether you’re a potion enthusiast, a curious shopper, or an aspiring alchemist, this API will help guide you through the arcane world of mystical concoctions.

---

## General Error Responses

- **500 Internal Server Error**: "For Cauldron's sake! Something spilled and set fire to everything. Please try again later."

---

## **GET** `/potions`

Retrieve all potions (including limited edition ones). Supports filtering via query parameters.

### Query Parameters (optional)

- **price** (number): Maximum price for potions. This would filter potions with prices <= price.
- **in_stock** (boolean): Filter potions based on stock availability (e.g., `true` or `false`).
- **animal_friendly** (boolean): Filter potions based on whether they are animal-friendly.
- **colour** (string): Filter potions by colour (case-insensitive).
- **is_limited_edition** (boolean): Filter potions by whether they are limited edition (available for a short time). These will have release_date and end_date data as well.
- **is_custom** (boolean): Filter potions by whether they are custom potions (these would be populated by the user).

### Response

- **200 OK**: List of potions matching the query.

#### Example Request

```bash
GET /potions?price=30&in_stock=true
```

#### Example Response

```json
[
  {
    "id": 1,
    "name": "Potion of Amplified Courage",
    "is_limited_edition": false,
    "is_custom": false,
    "price": 30.0,
    "in_stock": true,
    "animal_friendly": true,
    "colour": "Purple",
    "ingredients": ["Dragon Blood", "Phoenix Feather", "Sun's Rays"],
    "directions_of_use": "Drink 1 sip to boost courage.",
    "estimated_delivery_time": "2 days",
    "effect": "Enhances bravery already present within you, turning hesitation into boldness.",
    "image": "potion-1.jpg",
    "alt_text": "A bright purple potion glowing with courage-enhancing magic.",
    "caution_warning": "May make you overly reckless if overused."
  },
  {
    "id": 6,
    "name": "Potion of Vitality",
    "is_limited_edition": false,
    "is_custom": false,
    "price": 20.0,
    "in_stock": true,
    "animal_friendly": true,
    "colour": "Golden",
    "ingredients": ["Ginseng Root", "Fairy Nectar", "Unicorn Hair"],
    "directions_of_use": "Take one sip to feel rejuvenated.",
    "estimated_delivery_time": "1 hour",
    "effect": "Recharge your energy and feel rejuvenated with every sip.",
    "image": "potion-6.jpg",
    "alt_text": "A golden potion sparkling with vitality-enhancing energy.",
    "caution_warning": "Overuse may result in exhaustion once the effects wear off."
  }
]
```

---

## **GET** `/potions/:id`

Retrieve a specific potion by its numeric ID.

### Path Parameters

- **id** (number): The ID of the potion to retrieve.

### Response

- **200 OK**: The potion object.
- **400 Bad Request**: If the potion with the given ID is not found.

#### Example Request

```bash
GET /potions/18
```

#### Example Response

```json
{
  "id": 18,
  "name": "Gifted Glow Elixir",
  "is_limited_edition": true,
  "is_custom": false,
  "price": 35.0,
  "in_stock": true,
  "animal_friendly": true,
  "colour": "Green",
  "ingredients": [
    "Golden Sprinkles",
    "Evergreen Essence",
    "Joy Extract",
    "Sounds of Children Laughing"
  ],
  "directions_of_use": "Drink to radiate the joy of giving and receiving.",
  "estimated_delivery_time": "3 days",
  "effect": "Enhances generosity and holiday spirit.",
  "image": "christmas-potion-3.jpg",
  "alt_text": "A shimmering green potion with a magical red bow.",
  "caution_warning": "Prolonged use may lead to excessive gift-giving.",
  "release_date": "2024-11-30",
  "end_date": "2024-12-26"
}
```

---

## **GET** `/ingredients`

Retrieve all ingredients. Supports filtering via query parameters.

### Query Parameters (optional)

- **price** (number): Maximum price for ingredients.

### Response

- **200 OK**: List of ingredients matching the query.

#### Example Request

```bash
GET /ingredients?price=5
```

#### Example Response

```json
[
  {
    "id": 1,
    "name": "Dragon Blood",
    "price": 5.0
  },
  {
    "id": 4,
    "name": "Eye of Newt",
    "price": 2.0
  }
]
```

---

## **GET** `/ingredients/:id`

Retrieve a specific ingredient by its numeric ID.

### Path Parameters

- **id** (number): The ID of the ingredient to retrieve.

### Response

- **200 OK**: The ingredient object.
- **400 Bad Request**: If the ingredient with the given ID is not found.

#### Example Request

```bash
GET /ingredients/40
```

#### Example Response

```json
{
  "id": 40,
  "name": "Charisma Petals",
  "price": 5.0
}
```

---

## **GET** `/images`

Retrieve a list of image files in the `stock-img/` directory as a JSON array of the names.

### Response

- **200 OK**: A JSON array of image file names.

#### Example Request

```bash
GET /images
```

#### Example Response

```json
[
  "background-homepage.jpg",
  "cauldron-brewing.jpg",
  "christmas-potion-1.jpg",
  "christmas-potion-2.jpg",
  "christmas-potion-3.jpg",
  "christmas-potion-4.jpg",
  "christmas-potion-bundle.jpg",
  "christmas.jpg",
  "customer-service.jpg",
  "potion-1.jpg",
  "potion-10.jpg",
  "potion-11.jpg",
  "potion-12.jpg",
  "potion-13.jpg",
  "potion-14.jpg",
  "potion-15.jpg",
  "potion-16.jpg",
  "potion-17.jpg",
  "potion-18.jpg",
  "potion-2.jpg",
  "potion-3.jpg",
  "potion-4.jpg",
  "potion-5.jpg",
  "potion-6.jpg",
  "potion-7.jpg",
  "potion-8.jpg",
  "potion-9.jpg",
  "potions-quiz.jpg",
  "potions.jpg"
]
```

---

### **POST** `/checkout`

Processes the entire cart for checkout. This endpoint validates the items in the cart, checks their availability, and calculates the total cost.

---

### **Request Body (JSON)**

The request body must include an array of items.

| Key        | Type   | Required | Description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| `name`     | string | Yes      | The name of the potion to purchase.     |
| `quantity` | number | Yes      | The quantity of the potion to purchase. |

---

### **Response**

- **201 Created**: The order was successfully processed.
- **400 Bad Request**:
  - If the cart is empty or not an array.
  - If a potion is not found in the inventory.
  - If a potion is out of stock.

---

### **Workflow Note**

- The cart is managed client-side (e.g., in local storage). When the user proceeds to checkout, the client sends the entire cart (including custom potions) as an array of objects in the request body.
- Custom potions are treated as unique items and should be included in the cart with their name and `quantity` specified.

### **Example Request**

```http
POST /checkout
Content-Type: application/json

[
  {
    "name": "Potion of Amplified Courage",
    "quantity": 2
  },
  {
    "name": "Potion of Vitality",
    "quantity": 1
  }
]
```

---

### **Example Success Response**

```json
{
  "message": "Order successfully processed. A bundle of spooky somethings are coming your way soon!",
  "totalCost": 80.0,
  "orderedItems": [
    {
      "name": "Potion of Amplified Courage",
      "quantity": 2
    },
    {
      "name": "Potion of Vitality",
      "quantity": 1
    }
  ]
}
```

---

### **Example Error Responses**

#### Missing or Invalid Cart:

```json
{
  "error": "Cart must have at least one potion. What kind of witch are you!?"
}
```

#### Potion Not Found:

```json
{
  "error": "Some items are unavailable. We are a popular witchy website, what did you expect!",
  "unavailableItems": [
    { "name": "Invalid Potion", "reason": "Potion not found." }
  ]
}
```

#### Potion Out of Stock:

```json
{
  "error": "Some items are unavailable. We are a popular witchy website, what did you expect!",
  "unavailableItems": [
    { "name": "Potion of Vitality", "reason": "Out of stock." }
  ]
}
```

---

## **POST** `/custom_potions`

Create a custom potion and add it to the cart. Required fields must be provided, while optional fields will default to preset values if not included. Note: This potion is recorded on the server for reference, but it is not automatically placed into any server-side cart. The client is responsible for taking this potion data and adding it to their cart logic on the front end.

### **Request Body (JSON)**

| Key                       | Type        | Required | Default Value (defaults apply only when omitted, not if explicitly set to null) | Description                                                                                                                                                                                                                                            |
| ------------------------- | ----------- | -------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                    | string      | Yes      | -                                                                               | Name of the custom potion.                                                                                                                                                                                                                             |
| `price`                   | number      | Yes      | -                                                                               | Total price of the potion.                                                                                                                                                                                                                             |
| `ingredients`             | array       | Yes      | -                                                                               | Array of ingredient names. If a potion requires multiple units of the same ingredient, include the ingredient multiple times in the array (e.g., `["Dragon Blood", "Dragon Blood"]` for 2 units of Dragon Blood). Each entry decreases the stock by 1. |
| `animal_friendly`         | boolean     | No       | `false`                                                                         | Whether the potion is animal-friendly.                                                                                                                                                                                                                 |
| `colour`                  | string      | No       | `"Transparent"`                                                                 | Colour of the potion.                                                                                                                                                                                                                                  |
| `directions_of_use`       | string      | No       | `"Use with caution."`                                                           | Instructions for potion use.                                                                                                                                                                                                                           |
| `estimated_delivery_time` | string      | No       | `"5 days"`                                                                      | Estimated delivery time for the potion.                                                                                                                                                                                                                |
| `effect`                  | string      | No       | `"Custom magical effect."`                                                      | Description of the potion's magical effect.                                                                                                                                                                                                            |
| `caution_warning`         | string      | No       | `"None."`                                                                       | Cautions or warnings associated with the potion.                                                                                                                                                                                                       |
| `is_limited_edition`      | boolean     | No       | `false`                                                                         | Whether the potion is a limited edition.                                                                                                                                                                                                               |
| `release_date`            | string/null | No       | `null`                                                                          | Release date of the potion (if applicable).                                                                                                                                                                                                            |
| `end_date`                | string/null | No       | `null`                                                                          | End date of the potion (if applicable).                                                                                                                                                                                                                |

---

### **Response**

- **201 Created**: The potion was successfully created and added to the cart.
- Default values for optional fields will be included in the response if not provided.
- **400 Bad Request**:
  - If required fields (`name`, `price`, `ingredients`) are missing or invalid.
  - If optional fields are provided in the wrong format.
  - If ingredients are not available in stock.

---

### **Example Request**

#### Minimal Request:

```json
{
  "name": "Potion of Eternal Wisdom",
  "price": 15,
  "ingredients": ["Dragon Blood", "Phoenix Feather"]
}
```

#### Full Request:

```json
{
  "name": "Potion of Eternal Wisdom",
  "price": 15,
  "ingredients": ["Dragon Blood", "Phoenix Feather"],
  "animal_friendly": true,
  "colour": "Blue",
  "directions_of_use": "Drink to enhance intelligence.",
  "estimated_delivery_time": "3 days",
  "effect": "Grants temporary heightened intelligence.",
  "caution_warning": "Do not overuse.",
  "is_limited_edition": false,
  "release_date": "2024-12-01",
  "end_date": "2024-12-31"
}
```

---

### **Example Success Response**

#### Minimal Response:

```json
{
  "message": "Ready to create magic? Custom potion created and added to custom potions successfully!",
  "potion": {
    "name": "Potion of Eternal Wisdom",
    "price": 15,
    "is_custom": true,
    "animal_friendly": false,
    "colour": "Transparent",
    "ingredients": ["Dragon Blood", "Phoenix Feather"],
    "directions_of_use": "Use with caution.",
    "estimated_delivery_time": "5 days",
    "effect": "Custom magical effect.",
    "caution_warning": "None.",
    "is_limited_edition": false,
    "release_date": null,
    "end_date": null,
    "image": "cauldron-brewing.jpg",
    "alt_text": "A bubbling cauldron brewing a magical potion."
  }
}
```

#### Full Response:

```json
{
  "message": "Ready to create magic? Custom potion created and added to custom potions successfully!",
  "potion": {
    "name": "Potion of Eternal Wisdom",
    "price": 15,
    "is_custom": true,
    "animal_friendly": true,
    "colour": "Blue",
    "ingredients": ["Dragon Blood", "Phoenix Feather"],
    "directions_of_use": "Drink to enhance intelligence.",
    "estimated_delivery_time": "3 days",
    "effect": "Grants temporary heightened intelligence.",
    "caution_warning": "Do not overuse.",
    "is_limited_edition": false,
    "release_date": "2024-12-01",
    "end_date": "2024-12-31",
    "image": "cauldron-brewing.jpg",
    "alt_text": "A bubbling cauldron brewing a magical potion."
  }
}
```

---

### **Example Error Responses**

#### Missing Required Fields:

```json
{
  "error": "Missing required field: name."
}
```

#### Invalid Field Type:

```json
{
  "error": "Invalid field: animal_friendly (boolean)."
}
```

#### Insufficient Stock for Ingredients:

```json
{
  "error": "Insufficient stock for some ingredients.",
  "insufficientStock": [{ "name": "Phoenix Feather", "reason": "Out of stock" }]
}
```

---
