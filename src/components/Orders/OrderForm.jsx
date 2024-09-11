import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';

const { Option } = Select;

const OrderForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4022/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Order placed successfully');
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Failed to place order');
      }
    } catch (error) {
      message.error('Error occurred while placing the order');
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
        label="Product"
        name="product"
        rules={[{ required: true, message: 'Please enter the product name' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please enter the quantity' }]}
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[{ required: true, message: 'Please enter the customer name' }]}
      >
        <Input placeholder="Enter customer name" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select the order status' }]}
      >
        <Select placeholder="Select order status">
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;