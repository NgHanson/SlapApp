import React, { Component, Fragment } from 'react';
import { slide as Menu } from "react-burger-menu";
import ParkingDisplay from './ParkingDisplay';
import AnalyticsSelector from './AnalyticsSelector';
import SearchBox from './SearchBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import * as Colour from '../../constants/colour_consts';

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
       mapApiLoaded,
       map,
       mapApi,
       addplace,
       userType,
       userTypeToggle,
       viewType,
       changeViewType,
       updateMapCenter,
       changeCurrentLot,
       setAnalyticsSelections,
       currentLotID,
    } = this.props;

    if (viewType == 1) { //General View
      return (
        // Pass on our props
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY }}}>
          <Container className="flex-column" style={{width: "100%", height: "90%"}}>
              <Row>Find Parking Near...</Row>
              <Row>{mapApiLoaded && <SearchBox updateMapCenter={updateMapCenter} map={map} mapApi={mapApi} addplace={addplace.bind(this)} />}</Row>
            <Row>
              {this.state.parkingAreas && <ParkingDisplay title='Saved Lots' userType={userType} updateMapCenter={updateMapCenter} parkingareas={this.state.parkingAreas}></ParkingDisplay>}
              {this.state.parkingAreas && (userType==2) && <ParkingDisplay title='Managed Lots' changeCurrentLot={changeCurrentLot} changeViewType={changeViewType} userType={userType} updateMapCenter={updateMapCenter} managedparkingareas={this.state.parkingAreas}></ParkingDisplay>}
            </Row>
            <Row style={{bottom: "20px", position: "absolute"}}>
              <Button variant={"secondary"} style={{fontSize: '11pt'}} onClick={() => userTypeToggle()} >
                {userType == 1 ? 'User Type: Standard User' : 'User Type: Owner'}
              </Button>
            </Row>
          </Container>
        </Menu>
      );
    } else if (viewType == 2) { // Lot

      return (
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY}}}>
          <Container width="100%">
            <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, width: '100%'}} onClick={() => changeViewType(1)} >
              {'Back'}
            </Button>
          </Container>
        </Menu>
      );

    } else { // Analytics
      return (
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY}}}>
          <Container width="100%">
            <AnalyticsSelector currentLotID={currentLotID} setAnalyticsSelections={setAnalyticsSelections} changeViewType={changeViewType}/>
          </Container>
        </Menu>
      );
    }
  }
}

export default SideBar
