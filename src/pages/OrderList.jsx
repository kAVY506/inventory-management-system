import React from 'react';
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const { orders } = useOrders();

  return (
    <div>
      <h2>Order List</h2>
      <Link to="/add-order">Add Order</Link>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.customerName} - {order.totalAmount} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;