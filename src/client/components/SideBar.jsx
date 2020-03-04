import React, { Component, Fragment } from 'react';
import { slide as Menu } from "react-burger-menu";
import ParkingDisplay from './ParkingDisplay';
import AnalyticsSelector from './AnalyticsSelector';
import SearchBox from './SearchBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import * as Colour from '../../constants/colour_consts';

import { Chart } from "react-google-charts";
import { lotOccupancyGraph } from '../../constants/examples.js';
const options = {
  title: "Occupancy",
  legend: "none",
  hAxis: { showTextEvery: 4 },
  vAxis: { maxValue: 140 }, //this DN work?
  isStacked: true,
  series: {
    0:{color: Colour.LIGHT_RED},
    1:{color: Colour.LIGHT_BLUE},
  }
};

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
       lotInfo,
    } = this.props;

    let currentLotID = lotInfo ? lotInfo.id : 0;

    if (viewType == 1) { //General View
      return (
        // Pass on our props
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY }}}>
          <Container className="flex-column" style={{width: "100%", height: "90%"}}>
            <Row style={{fontSize: 'xx-large'}}><div style={{color: 'white'}}>SLAP</div><div style={{color: 'red'}}>.</div></Row>
            <Row>Find Parking Near...</Row>
            <Row style={{marginBottom: '20px'}}>{mapApiLoaded && <SearchBox updateMapCenter={updateMapCenter} map={map} mapApi={mapApi} addplace={addplace.bind(this)} />}</Row>
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
          <div>
            <div style={{display: 'flex', fontSize: 'xx-large'}}><div style={{color: 'white'}}>SLAP</div><div style={{color: 'red'}}>.</div></div>
            <div>
              Details:
            </div>
            <div>
              {lotInfo['name']}
            </div>
            <div>
              {`${lotInfo['freeCount']}/${lotInfo['capacity']}`}
            </div>
            <Chart
              chartType="ColumnChart"
              width="200px"
              height="120px"
              data={lotOccupancyGraph}
              options={options}
            />
            <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, width: '100%'}} onClick={() => changeViewType(1)} >
              {'Back'}
            </Button>
          </div>
        </Menu>
      );

    } else { // Analytics
      return (
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY}}}>
          <div>
          <div style={{display: 'flex', fontSize: 'xx-large'}}><div style={{color: 'white'}}>SLAP</div><div style={{color: 'red'}}>.</div></div>
            <AnalyticsSelector currentLotID={currentLotID} setAnalyticsSelections={setAnalyticsSelections} changeViewType={changeViewType}/>
          </div>
        </Menu>
      );
    }
  }
}

export default SideBar
