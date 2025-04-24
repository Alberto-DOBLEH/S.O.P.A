// src/api.js

/**
 * Llama a la ruta del backend que devuelve la lista de productos.
 * @returns {Promise<Array>} Array de productos con { id, name, price }
 */
export async function fetchProducts() {
    // 1. Haces la petición al backend
    const response = await fetch('http://localhost:3001/api/products');
  
    // 2. Manejo de errores si el estado no es 2xx
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    // 3. Convertís la respuesta JSON en un objeto JS
    const products = await response.json();
  
    // 4. Lo devolvés para que quien llame fetchProducts() lo reciba
    return products;
  }
  