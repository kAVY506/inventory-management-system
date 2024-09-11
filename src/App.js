import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import OrderList from './pages/OrderList';
import OrderForm from './pages/OrdeFormPage';
import SupplierList from './pages/SupplierList';
import SupplierForm from './pages/SupplierFormPage';
import Dashboard from './pages/Dashboard';
import { OrderProvider } from './context/OrderContext';
import { InventoryProvider } from './context/InventoryContext';
import { SupplierProvider } from './context/SupplierContext';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <InventoryProvider>
        <OrderProvider>
          <SupplierProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/add-product" element={<ProductForm />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/add-order" element={<OrderForm />} />
              <Route path="/suppliers" element={<SupplierList />} />
              <Route path="/add-supplier" element={<SupplierForm />} />

            </Routes>
          </SupplierProvider>
        </OrderProvider>
      </InventoryProvider>
    </Router>
  );
};

export default App;