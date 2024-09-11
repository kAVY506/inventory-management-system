import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { useOrders } from '../context/OrderContext';
import { useSuppliers } from '../context/SupplierContext';

const Dashboard = () => {
  const { products } = useInventory();
  const { orders } = useOrders();
  const { suppliers } = useSuppliers();

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Total Products</h3>
        <p>{products.length}</p>
      </div>
      <div>
        <h3>Total Orders</h3>
        <p>{orders.length}</p>
      </div>
      <div>
        <h3>Total Suppliers</h3>
        <p>{suppliers.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;