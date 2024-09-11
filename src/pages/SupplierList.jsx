import React from 'react';
import { useSuppliers } from '../context/SupplierContext';
import { Link } from 'react-router-dom';

const SupplierList = () => {
  const { suppliers } = useSuppliers();

  return (
    <div>
      <h2>Supplier List</h2>
      <Link to="/add-supplier">Add Supplier</Link>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier._id}>
            {supplier.name} - {supplier.contactEmail} - {supplier.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;