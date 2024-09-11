import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const { addProduct } = useInventory();
  const [productData, setProductData] = useState({
    name: '',
    sku: '',
    price: '',
    currentStock: '',
    reorderLevel: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(productData);
    navigate('/products'); // Redirect to Product List
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={productData.name} onChange={handleChange} />
      </div>
      <div>
        <label>SKU</label>
        <input type="text" name="sku" value={productData.sku} onChange={handleChange} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={productData.price} onChange={handleChange} />
      </div>
      <div>
        <label>Current Stock</label>
        <input type="number" name="currentStock" value={productData.currentStock} onChange={handleChange} />
      </div>
      <div>
        <label>Reorder Level</label>
        <input type="number" name="reorderLevel" value={productData.reorderLevel} onChange={handleChange} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;