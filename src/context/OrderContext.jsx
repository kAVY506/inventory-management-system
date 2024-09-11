import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the OrderContext
const OrderContext = createContext();

// Provider component to wrap the app
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4022/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Function to add a new order to the backend
  const addOrder = async (newOrder) => {
    try {
      const response = await axios.post('http://localhost:4022/api/orders', newOrder);
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrders = () => React.useContext(OrderContext);