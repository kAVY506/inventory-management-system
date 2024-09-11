import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the SupplierContext
const SupplierContext = createContext();

// Provider component to wrap the app
export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers from the API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  // Function to add a new supplier to the backend
  const addSupplier = async (newSupplier) => {
    try {
      const response = await axios.post('http://localhost:4022/api/suppliers', newSupplier);
      setSuppliers((prevSuppliers) => [...prevSuppliers, response.data]);
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <SupplierContext.Provider value={{ suppliers, addSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
};

// Custom hook to use the SupplierContext
export const useSuppliers = () => React.useContext(SupplierContext);