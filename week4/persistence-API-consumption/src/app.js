// GLOBAL VARIABLES AND CONFIGURATION

// API base URL - Change this to your JSON Server URL
// To start JSON Server: json-server --watch db.json --port 3000
const API_URL = 'http://localhost:3000/products';

// Global array to store products
let products = [];

// DOM ELEMENTS SELECTION

// Form and input elements
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productDescriptionInput = document.getElementById('productDescription');

// List and buttons
const productList = document.getElementById('productList');
const syncBtn = document.getElementById('syncBtn');
const messageContainer = document.getElementById('messageContainer');

// UTILITY FUNCTIONS

/**
 * Shows a message to the user in the DOM
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success' or 'error')
 */
function showMessage(message, type = 'success') {
    messageContainer.textContent = message;
    messageContainer.className = `message ${type} show`;
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageContainer.classList.remove('show');
    }, 3000);
    
    // Also log to console
    console.log(`[${type.toUpperCase()}] ${message}`);
}

/**
 * Validates product data
 * @param {string} name - Product name
 * @param {string} price - Product price
 * @param {string} description - Product description
 * @returns {boolean} - True if valid, false otherwise
 */
function validateProductData(name, price, description) {
    // Check if fields are empty
    if (!name.trim() || !price.trim() || !description.trim()) {
        showMessage('Todos los campos son obligatorios', 'error');
        return false;
    }
    
    // Validate that price is a positive number
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
        showMessage('El precio debe ser un número positivo', 'error');
        return false;
    }
    
    return true;
}

/**
 * Generates a unique ID for products
 * @returns {string} - Unique ID
 */
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// LOCAL STORAGE FUNCTIONS

/**
 * Saves products to Local Storage
 */
function saveToLocalStorage() {
    try {
        localStorage.setItem('products', JSON.stringify(products));
        console.log('Productos guardados en LocalStorage:', products);
    } catch (error) {
        console.error('Error al guardar en LocalStorage:', error);
        showMessage('Error al guardar localmente', 'error');
    }
}

/**
 * Loads products from Local Storage
 */
function loadFromLocalStorage() {
    try {
        const storedProducts = localStorage.getItem('products');
        
        if (storedProducts) {
            products = JSON.parse(storedProducts);
            console.log('Productos cargados desde LocalStorage:', products);
            renderProducts();
        } else {
            console.log('ℹNo hay productos en LocalStorage');
        }
    } catch (error) {
        console.error('Error al cargar desde LocalStorage:', error);
        products = [];
    }
}

// DOM MANIPULATION FUNCTIONS

/**
 * Renders all products in the DOM
 */
function renderProducts() {
    // Clear the current list
    productList.innerHTML = '';
    
    // Check if there are products to render
    if (products.length === 0) {
        productList.innerHTML = '<li style="text-align: center; color: #999;">No hay productos para mostrar</li>';
        return;
    }
    
    // Create and add each product to the list
    products.forEach(product => {
        const li = createProductElement(product);
        productList.appendChild(li);
    });
    
    console.log(`${products.length} productos renderizados en el DOM`);
}

/**
 * Creates a product element (li) for the DOM
 * @param {Object} product - Product object
 * @returns {HTMLElement} - Li element with product info
 */
function createProductElement(product) {
    // Create the main li element
    const li = document.createElement('li');
    
    // Create container for product information
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    
    // Product name
    const nameElement = document.createElement('div');
    nameElement.className = 'product-name';
    nameElement.textContent = product.name;
    
    // Product price
    const priceElement = document.createElement('div');
    priceElement.className = 'product-price';
    priceElement.textContent = `$${parseFloat(product.price).toFixed(2)}`;
    
    // Product description
    const descElement = document.createElement('div');
    descElement.className = 'product-description';
    descElement.textContent = product.description;
    
    // Add all elements to product info container
    productInfo.appendChild(nameElement);
    productInfo.appendChild(priceElement);
    productInfo.appendChild(descElement);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar';
    
    // Add click event to delete button
    deleteBtn.addEventListener('click', () => {
        deleteProduct(product.id);
    });
    
    // Add info and button to the li
    li.appendChild(productInfo);
    li.appendChild(deleteBtn);
    
    return li;
}

/**
 * Adds a new product
 * @param {Object} productData - Object with product data
 */
function addProduct(productData) {
    // Add the product to the array
    products.push(productData);
    
    // Save to Local Storage
    saveToLocalStorage();
    
    // Re-render the list
    renderProducts();
    
    showMessage('Producto agregado exitosamente', 'success');
}

/**
 * Deletes a product by ID
 * @param {string} productId - ID of the product to delete
 */
function deleteProduct(productId) {
    // Find the product index
    const index = products.findIndex(p => p.id === productId);
    
    if (index !== -1) {
        const productName = products[index].name;
        
        // Remove the product from the array
        products.splice(index, 1);
        
        // Save changes to Local Storage
        saveToLocalStorage();
        
        // Re-render the list
        renderProducts();
        
        showMessage(`Producto "${productName}" eliminado`, 'success');
        
        // If connected to API, also delete from server
        deleteProductFromAPI(productId);
    }
}

// API FUNCTIONS (FETCH API)

/**
 * GET: Gets all products from the API
 */
async function getProductsFromAPI() {
    try {
        console.log('Obteniendo productos desde la API...');
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Productos obtenidos de la API:', data);
        
        // Update the products array
        products = data;
        
        // Save to Local Storage
        saveToLocalStorage();
        
        // Render in DOM
        renderProducts();
        
        showMessage(`${data.length} productos sincronizados desde el servidor`, 'success');
        
    } catch (error) {
        console.error('Error al obtener productos de la API:', error);
        showMessage('Error al conectar con el servidor. Usando datos locales.', 'error');
    }
}

/**
 * POST: Sends a new product to the API
 * @param {Object} product - Product to send
 */
async function postProductToAPI(product) {
    try {
        console.log('Enviando producto a la API...');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Producto agregado en la API:', data);
        showMessage('Producto sincronizado con el servidor', 'success');
        
    } catch (error) {
        console.error('Error al enviar producto a la API:', error);
        console.log('ℹEl producto se guardó localmente pero no se sincronizó con el servidor');
    }
}

/**
 * DELETE: Deletes a product from the API
 * @param {string} productId - ID of the product to delete
 */
async function deleteProductFromAPI(productId) {
    try {
        console.log(`Eliminando producto ${productId} de la API...`);
        
        const response = await fetch(`${API_URL}/${productId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        console.log(`Producto ${productId} eliminado de la API`);
        
    } catch (error) {
        console.error('Error al eliminar producto de la API:', error);
        console.log('ℹEl producto se eliminó localmente pero no del servidor');
    }
}

/**
 * PUT: Updates a product in the API
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product data
 */
async function updateProductInAPI(productId, updatedProduct) {
    try {
        console.log(`Actualizando producto ${productId} en la API...`);
        
        const response = await fetch(`${API_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Producto actualizado en la API:', data);
        showMessage('Producto actualizado en el servidor', 'success');
        
    } catch (error) {
        console.error('Error al actualizar producto en la API:', error);
    }
}

// EVENT LISTENERS

/**
 * Form submit event - Add new product
 */
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = productNameInput.value;
    const price = productPriceInput.value;
    const description = productDescriptionInput.value;
    
    // Validate data
    if (!validateProductData(name, price, description)) {
        return;
    }
    
    // Create product object
    const newProduct = {
        id: generateId(),
        name: name.trim(),
        price: parseFloat(price).toFixed(2),
        description: description.trim()
    };
    
    // Add product locally
    addProduct(newProduct);
    
    // Send to API
    postProductToAPI(newProduct);
    
    // Clear form
    productForm.reset();
    productNameInput.focus();
});

/**
 * Sync button click event - Sync with API
 */
syncBtn.addEventListener('click', () => {
    getProductsFromAPI();
});

// INITIALIZATION

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación iniciada');
    
    // Load products from Local Storage
    loadFromLocalStorage();
});