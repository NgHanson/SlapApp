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
    var self = this;
    console.log("here... ===================")
    console.log(this.props.lots)
    if (Object.entries(this.props.lots).length === 0) {
      fetch('/api/parking/all')
        .then(res => res.json())
        .then(function(res) {
          let lotMap = {};
          res['parkingAreas'].forEach(l => {
            lotMap[l.lot_id] = l;
          });
          self.setState({parkingAreas: lotMap});
        })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.lots !== prevProps.lots) {
      this.setState({parkingAreas: this.props.lots});
    }
    if (this.props.socketLotData !== prevProps.socketLotData  && this.props.socketLotData !== undefined && this.state.parkingAreas !== null) {
      console.log("socketLotData updated...")
      console.log(this.props.socketLotData)
      let curr_lots = this.state.parkingAreas;
      if (curr_lots[this.props.socketLotData.lot_id]) {
        if (String(this.props.socketLotData.lot_id) in curr_lots) {
        console.log(curr_lots[this.props.socketLotData.lot_id])
        curr_lots[this.props.socketLotData.lot_id].capacity = this.props.socketLotData.capacity;
        curr_lots[this.props.socketLotData.lot_id].freeCount = this.props.socketLotData.freeCount;    
        this.setState({parkingAreas: curr_lots});
        }
        
      }
    }
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
            <div style={{marginBottom: '8px'}}>
              Details:
            </div>
            <div>
              {lotInfo['name']}
            </div>
            <div style={{marginBottom: '8px'}}>
              {`Occupancy: ${lotInfo['freeCount']}/${lotInfo['capacity']}`}
            </div>
            <div style={{marginBottom: '20px'}}>
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="140px"
                data={lotOccupancyGraph}
                options={options}
              />
            </div>
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
