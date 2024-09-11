import React, { useState } from 'react';
import { useSuppliers } from '../context/SupplierContext';
import { useNavigate } from 'react-router-dom';

const SupplierForm = () => {
  const { addSupplier } = useSuppliers();
  const [supplierData, setSupplierData] = useState({
    name: '',
    contactEmail: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplier(supplierData);
    navigate('/suppliers'); // Redirect to Supplier List
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Supplier Name</label>
        <input type="text" name="name" value={supplierData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Contact Email</label>
        <input type="email" name="contactEmail" value={supplierData.contactEmail} onChange={handleChange} />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" value={supplierData.phone} onChange={handleChange} />
      </div>
      <button type="submit">Add Supplier</button>
    </form>
  );
};

export default SupplierForm;