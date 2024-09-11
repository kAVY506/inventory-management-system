import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the InventoryContext
const InventoryContext = createContext();

// Provider component to wrap the app
export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4022/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Function to add a new product to the backend
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:4022/api/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <InventoryContext.Provider value={{ products, addProduct }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use the InventoryContext
export const useInventory = () => React.useContext(InventoryContext);