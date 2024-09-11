 import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const SupplierForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4022/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Supplier added successfully');
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Failed to add supplier');
      }
    } catch (error) {
      message.error('Error occurred while adding the supplier');
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
        label="Supplier Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the supplier name' }]}
      >
        <Input placeholder="Enter supplier name" />
      </Form.Item>

      <Form.Item
        label="Contact"
        name="contact"
        rules={[{ required: true, message: 'Please enter the contact number' }]}
      >
        <Input placeholder="Enter contact number" />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please enter the address' }]}
      >
        <Input placeholder="Enter address" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SupplierForm;
