import React, { useEffect } from 'react';
import { Table, message } from 'antd';
import { useSuppliers } from './context/SupplierContext';

const SupplierList = () => {
  const { state, dispatch } = useSuppliers();
  const { suppliers, loading } = state;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:4022/api/suppliers');
        const data = await response.json();
        dispatch({ type: 'SET_SUPPLIERS', payload: data });
      } catch (error) {
        message.error('Error fetching suppliers');
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    };

    fetchSuppliers();
  }, [dispatch]);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  return (
    <div>
      <h2>Supplier List</h2>
      <Table
        columns={columns}
        dataSource={suppliers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default SupplierList;