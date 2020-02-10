import React from "react";
import { slide as Menu } from "react-burger-menu";
import NavBar from './NavBar';
import ParkingDisplay from './ParkingDisplay';
import AnalyticsDashboard from './AnalyticsDashboard';
export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
    <NavBar></NavBar>
    <ParkingDisplay></ParkingDisplay>
    <AnalyticsDashboard></AnalyticsDashboard>
    </Menu>
  );
};

      // <a className="menu-item" href="/">
      //   Home
      // </a>

      // <a className="menu-item" href="/burgers">
      //   Burgers
      // </a>

      // <a className="menu-item" href="/pizzas">
      //   Pizzas
      // </a>

      // <a className="menu-item" href="/desserts">
      //   Desserts
      // </a>