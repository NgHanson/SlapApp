// React Imports
import React, { Component, Fragment } from 'react';
// React-Icons Imports: https://react-icons.netlify.com/#/icons/fa
import { FaMapMarkedAlt, FaTimes, FaChartBar } from "react-icons/fa";
// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// StyleSheets
import './parkingdisplay.css';
import * as Colour from '../../constants/colour_consts';

export default class ParkingDisplay extends Component {
  constructor(props) {
    super(props);
    console.log("ParkingDisplayConstructor");
    console.log(this.props.parkingareas);
  }

  goToAnalyticsView = (lot_id, lat, lng) => {
    this.props.updateMapCenter(lat, lng)
    this.props.changeCurrentLot(lot_id)
    this.props.changeViewType(3)
  }

  showParkingLots = (parkingareas) => {
    let table = []

    // Outer loop to create parent
    for (let x=0; x < parkingareas.length; x++) {
      table.push(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '6px'}}>
          <div style={{fontSize: '11pt', width: '75px'}}>
            {parkingareas[x]['name']}
          </div>
          <div style={{fontSize: '11pt', width: '30px'}}>
            {parkingareas[x]['freeCount']}/{parkingareas[x]['capacity']}
          </div>
          <FaMapMarkedAlt className="display-icon" onClick={this.props.updateMapCenter.bind(this, parkingareas[x].lat, parkingareas[x].lng)}/>
          {this.props.parkingareas && <FaTimes className="display-icon"/>}
          {this.props.managedparkingareas && <FaChartBar onClick={this.goToAnalyticsView.bind(this, parkingareas[x].lot_id, parkingareas[x].lat, parkingareas[x].lng)} className="display-icon"/>}
        </div>
      );
    }
    return table
  }

  render() {
    const { title } = this.props;
    return(
      <Container style={{marginBottom:'20px'}}>
        <Row>{title}</Row>
        {this.props.parkingareas && <Fragment>{this.showParkingLots(this.props.parkingareas)}</Fragment>}
        {this.props.managedparkingareas && <Fragment>{this.showParkingLots(this.props.managedparkingareas)}</Fragment>}
        <Row className="justify-content-xs-center" style={{marginTop: '20px'}}><Col/><Col xs="auto"><Button variant='primary' style={{backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE}}>Add Lot</Button></Col><Col/></Row>
      </Container>
    );
  }
}

ParkingDisplay.defaultProps = {
  title: 'Lots',
  lotName: 'Test Lot 1',
  lotAddress: '200 University Ave W, Waterloo, ON N2L 3G1',
}