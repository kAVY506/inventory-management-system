import React, { useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { products } = useInventory();

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add-product">Add Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.sku} - {product.price} - {product.currentStock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;