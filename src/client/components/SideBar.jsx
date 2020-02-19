import React, { Component, Fragment } from 'react';
import { slide as Menu } from "react-burger-menu";
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
    this.state ={
      parkingAreas: null,
      timeRangeOpen: false,
    }
  }

  componentDidMount() {
    fetch('/api/parking/all')
      .then(res => res.json())
      .then(res => this.setState({parkingAreas: res['parkingAreas']}));
    
    console.log(this.state)
  }

  render() {
    const {
       mapApiLoaded, map, mapApi, addplace, userType, userTypeToggle
    } = this.props;

    return (
      // Pass on our props
      <Menu {...this.props}>
        <Container width="100%">
          <div style={{marginBottom:'20px'}}>
            <Row>Find Parking Near...</Row>
            <Row>{mapApiLoaded && <SearchBox map={map} mapApi={mapApi} addplace={addplace.bind(this)} />}</Row>
          </div>
          {this.state.parkingAreas && <ParkingDisplay title='Saved Lots' parkingareas={this.state.parkingAreas}></ParkingDisplay>}
          {this.state.parkingAreas && (userType==2) && <ParkingDisplay title='Managed Lots' parkingareas={this.state.parkingAreas}></ParkingDisplay>}
          {/*<AnalyticsDashboard></AnalyticsDashboard>*/}
        </Container>
        <Button variant={"secondary"} style={{fontSize: '11pt'}} onClick={() => userTypeToggle()} >
          {userType == 1 ? 'User Type: Standard User' : 'User Type: Owner'}
        </Button>
      </Menu>
    );
  }
}

export default SideBar
