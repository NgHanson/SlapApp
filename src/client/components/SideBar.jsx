import React, { Component, Fragment } from 'react';
import { slide as Menu } from "react-burger-menu";
import ParkingDisplay from './ParkingDisplay';
import AnalyticsSelector from './AnalyticsSelector';
import SearchBox from './SearchBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import * as Colour from '../../constants/colour_consts';
import { FaParking, FaRegClock } from "react-icons/fa";

import { Chart } from "react-google-charts";
import { lotOccupancyGraph, lotOccupancyOptions } from '../../constants/examples.js';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state ={
      parkingAreas: null,
      timeRangeOpen: false,
      lotInfo: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.lots !== prevProps.lots || this.props.currentLotID !== prevProps.currentLotID && this.props.lots !== undefined && this.props.currentLotID !== undefined) {
      this.setState({lotInfo: this.props.lots[this.props.currentLotID]});
    }
  }

  generateLogo() {
    return (
      <div style={{display: 'flex', fontSize: 'xx-large', paddingBottom: '20px'}}>
        <div style={{color: 'white'}}>SLAP</div>
        <div style={{color: 'red'}}>.</div>
    </div>
    );
  }

  generateNotes(given_notes) {
    let notes = given_notes.split("\\n");

    let divs = [];

    notes.forEach(n => {
      let note = n.trim();
      //debugger
      if ("Free Parking" == note) {
        divs.push(
          <div style={{display: 'flex', marginRight: '16px', alignItems: 'center'}}>
            <FaParking style={{background: Colour.GREEN, fontSize: '30px'}} />
            <div style={{marginLeft: '8px', fontSize: '14px'}}>Free Parking</div>
          </div>
        );
      } else if ("Permit Only" == note) {
        divs.push(
          <div style={{display: 'flex', marginRight: '16px', alignItems: 'center'}}>
            <FaParking style={{background: Colour.ORANGE, fontSize: '30px'}} />
            <div style={{marginLeft: '8px', fontSize: '14px'}}>Permit Only</div>
          </div>
        );
      } else if ("2HR Max" == note) {
        divs.push(
          <div style={{display: 'flex', marginRight: '16px', alignItems: 'center'}}>
            <FaRegClock style={{ fontSize: '30px'}}/>
            <div style={{marginLeft: '8px', fontSize: '14px'}}>2HR Max</div>
          </div>
        );
      }
    });

    return (
      <div style={{display: 'flex', marginBottom: '20px'}}>
        {divs}
      </div>
    );
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
       setMapsWrapperState
    } = this.props;

    if (viewType == 1) { //General View
      return (
        // Pass on our props
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY }}}>
          <Container className="flex-column" style={{width: "100%", height: "90%"}}>
            <Row style={{fontSize: 'xx-large'}}><div style={{color: 'white'}}>SLAP</div><div style={{color: 'red'}}>.</div></Row>
            <Row>Find Parking Near...</Row>
            <Row style={{marginBottom: '20px'}}>{mapApiLoaded && <SearchBox updateMapCenter={updateMapCenter} map={map} mapApi={mapApi} addplace={addplace.bind(this)} />}</Row>
            <Row>
              {this.props.savedLots && <ParkingDisplay 
                title='Saved Lots' 
                userType={userType} 
                updateMapCenter={updateMapCenter} 
                savedLots={this.props.savedLots}/>}
              {this.props.managedLots && (userType==2) && <ParkingDisplay 
                title='Managed Lots' 
                changeCurrentLot={changeCurrentLot} 
                changeViewType={changeViewType} 
                setMapsWrapperState={setMapsWrapperState}
                userType={userType} 
                updateMapCenter={updateMapCenter} 
                managedLots={this.props.managedLots}/>}
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
          {this.state.lotInfo && <div>
            {this.generateLogo()}
            <div style={{marginBottom: '10px'}}>
              {this.state.lotInfo['name']}
            </div>
            <div style={{marginBottom: '10px'}}>{this.state.lotInfo["address"]}</div>
            <div style={{marginBottom: '10px'}}>
              {`Occupancy: ${this.state.lotInfo['capacity'] - this.state.lotInfo['freeCount']}/${this.state.lotInfo['capacity']}`}
            </div>
            <div style={{margin: '20px 0'}}>
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="140px"
                data={lotOccupancyGraph}
                options={lotOccupancyOptions}
              />
            </div>
            {this.generateNotes(this.state.lotInfo["notes"])}
            <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, width: '100%'}} onClick={() => changeViewType(1)} >
              {'Back'}
            </Button>
          </div>}
        </Menu>
      );

    } else { // Analytics
      return (
        <Menu {...this.props} styles={{bmMenu: {background: Colour.DARK_BLUE_GREY}}}>
          <div>
          <div style={{display: 'flex', fontSize: 'xx-large'}}><div style={{color: 'white'}}>SLAP</div><div style={{color: 'red'}}>.</div></div>
            <AnalyticsSelector currentLotID={currentLotID} setAnalyticsSelections={setAnalyticsSelections} changeViewType={changeViewType} setMapsWrapperState={setMapsWrapperState}/>
          </div>
        </Menu>
      );
    }
  }
}

export default SideBar
