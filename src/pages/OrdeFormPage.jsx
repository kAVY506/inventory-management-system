import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const { addOrder } = useOrders();
  const [orderData, setOrderData] = useState({
    customerName: '',
    totalAmount: '',
    status: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addOrder(orderData);
    navigate('/orders'); // Redirect to Order List
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer Name</label>
        <input type="text" name="customerName" value={orderData.customerName} onChange={handleChange} />
      </div>
      <div>
        <label>Total Amount</label>
        <input type="number" name="totalAmount" value={orderData.totalAmount} onChange={handleChange} />
      </div>
      <div>
        <label>Status</label>
        <input type="text" name="status" value={orderData.status} onChange={handleChange} />
      </div>
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;