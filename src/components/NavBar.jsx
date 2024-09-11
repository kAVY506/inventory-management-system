import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Inventory Management
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/orders">Orders</Button>
        <Button color="inherit" component={Link} to="/suppliers">Suppliers</Button>
        <Button color="inherit" component={Link} to="/reports">Reports</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
