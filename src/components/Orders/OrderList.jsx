import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { useOrders } from './context/OrderContext';

const OrderList = () => {
  const { state, dispatch } = useOrders();
  const { orders, loading } =  state;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4022/api/orders');
        const data = await response.json();
        dispatch({ type: 'SET_ORDERS', payload: data });
      } catch (error) {
        message.error('Error fetching orders');
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    };

    fetchOrders();
  }, [dispatch]);

  const columns = [
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div>
      <h2>Order List</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderList;