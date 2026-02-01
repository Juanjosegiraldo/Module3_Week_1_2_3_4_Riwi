/* USER STORY M3W2: Data management with objects, sets, and maps in JavaScript
Author: Juan Jose Giraldo Muñoz

Objective:
Consolidate your understanding and application of advanced data structures in JavaScript, using objects, sets, and maps to organize, store, and manipulate information efficiently. With this story, every coder will be able to reinforce:
-The creation and manipulation of objects
-The use of sets to ensure data uniqueness
-The use of maps to store associative information
-The implementation of loops (for...in, for...of) and methods (forEach, Object.keys(), Object.values(), Object.entries())
-Basic validations to ensure correct data
*/

// Product Object Creation
// Constructor function for products
function Product(id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
}

// Instances
const rice = new Product(1, "Rice", 1000);
const beans = new Product(2, "Beans", 2000);
const meat = new Product(3, "Meat", 10000);
const corn = new Product(4, "Corn", 4000);
const lentils = new Product(5, "Lentils", 3000);
const chicken = new Product(6, "Chicken", -9000);

const productList = [rice, beans, meat, corn, lentils, chicken];

// Using Sets in JavaScript
console.log("Set Operations:");
const numbersArray = [1, 2, 3, 4, 5, 2, 4, 5, 6, 4, 8];
const uniqueNumbersSet = new Set(numbersArray);

// Automatic duplicate removal display
console.log("Set content (duplicates removed):", uniqueNumbersSet);

// Add a new number
uniqueNumbersSet.add(19);

// Check existence
console.log("Does it have 19?:", uniqueNumbersSet.has(19));

// Delete a number
uniqueNumbersSet.delete(3);

// Iterate using for...of
console.log("Iterating Set values:");
for (let value of uniqueNumbersSet) {
  console.log("Value:", value);
}

// Map Creation
// Relating Category (Key) to Product Name (Value)
const categoriesMap = new Map();
categoriesMap.set("Grains", rice.name);
categoriesMap.set("Proteins", meat.name);
categoriesMap.set("Grains", corn.name);

// Iteration over Data Structures
console.log("\nIterations");

// A. for...in to list object properties (using the first product)
console.log("Listing properties of the first product (for...in):");
for (let property in rice) {
  console.log(`${property}: ${rice[property]}`);
}

// B. for...of to iterate the Set
console.log("Iterating Set (for...of):");
for (let num of uniqueNumbersSet) {
  console.log("Number:", num);
}

// C. forEach to iterate the Map
console.log("Iterating Map (forEach):");
categoriesMap.forEach((productName, category) => {
  console.log(`Category: ${category} -> Product: ${productName}`);
});

// Validation and Testing
console.log("\n--- TASK 5: Validation & Testing ---");

// Validation logic
function isValid(product) {
  return product.id > 0 && typeof product.name === "string" && product.price > 0;
}

// Test: Full list validation
console.log("Full Product List (Validated):");
productList.forEach((p) => {
  if (isValid(p)) {
    console.log(`Valid: ${p.name} (ID: ${p.id})`);
  } else {
    console.warn(`Invalid product detected: ID ${p.id}`);
  }
});

// Final display of specific structures
console.log("Categories and Product names (Map):", categoriesMap);