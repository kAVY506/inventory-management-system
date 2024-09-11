import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, message } from 'antd';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';  // Required for Chart.js

const ReportingDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lowStockProducts: 0,
    salesData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4022/api/reports');
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        message.error('Error fetching report data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const salesData = {
    labels: statistics.salesData.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: statistics.salesData.map((item) => item.sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const productCategoryData = {
    labels: statistics.productCategories?.map((category) => category.name),
    datasets: [
      {
        label: 'Products by Category',
        data: statistics.productCategories?.map((category) => category.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
      },
    ],
  };

  return (
    <div>
      <h2>Reporting Dashboard</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Total Products" value={statistics.totalProducts} />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Total Orders" value={statistics.totalOrders} />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Low Stock Products" value={statistics.lowStockProducts} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card loading={loading} title="Monthly Sales">
            <Bar data={salesData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading} title="Product Distribution by Category">
            <Pie data={productCategoryData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportingDashboard;