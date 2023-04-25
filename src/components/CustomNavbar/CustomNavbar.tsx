import React from 'react';
import { Navbar } from 'react-bulma-components';

interface CustomNavbarProps {
  createNewIngredient?: () => void;
}

const CustomNavbar = ({ createNewIngredient }: CustomNavbarProps) => (
  <Navbar color="warning">
    <Navbar.Brand>
      <Navbar.Item>
        BreadMakerApp
      </Navbar.Item>
    </Navbar.Brand>
    <Navbar.Item onClick={createNewIngredient}>
      Create New
    </Navbar.Item>
  </Navbar>
);

export default CustomNavbar;