import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';

const ProductForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4022/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Product added successfully');
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Failed to add product');
      }
    } catch (error) {
      message.error('Error occurred while adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the product name' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please enter the product category' }]}
      >
        <Input placeholder="Enter product category" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter the product price' }]}
      >
        <InputNumber
          placeholder="Enter product price"
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Stock Quantity"
        name="stockQuantity"
        rules={[{ required: true, message: 'Please enter the stock quantity' }]}
      >
        <InputNumber
          placeholder="Enter stock quantity"
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Reorder Level"
        name="reorderLevel"
        rules={[{ required: true, message: 'Please enter the reorder level' }]}
      >
        <InputNumber
          placeholder="Enter reorder level"
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;