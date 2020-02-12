import React, { Component, Fragment } from 'react';
import { slide as Menu } from "react-burger-menu";
import NavBar from './NavBar';
import ParkingDisplay from './ParkingDisplay';
import AnalyticsDashboard from './AnalyticsDashboard';
import SearchBox from './SearchBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
       mapApiLoaded, map, mapApi, addplace
    } = this.props;
    return (
      // Pass on our props
      <Menu {...this.props}>
        <Container width="100%">
          <Row>
            Find Parking Near...
          </Row>
          <Row>
            {mapApiLoaded && <SearchBox map={map} mapApi={mapApi} addplace={addplace} />}
          </Row>
          <NavBar></NavBar>
          <ParkingDisplay></ParkingDisplay>
          <AnalyticsDashboard></AnalyticsDashboard>
          <Button variant="primary">Back</Button>
        </Container>
      </Menu>
    );
  }
}

export default SideBar
