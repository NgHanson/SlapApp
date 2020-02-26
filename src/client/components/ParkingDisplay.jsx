// React Imports
import React, { Component, Fragment } from 'react';
// React-Icons Imports: https://react-icons.netlify.com/#/icons/fa
import { FaMapMarkedAlt, FaTimes } from "react-icons/fa";
// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// StyleSheets
import './parkingdisplay.css';

export default class ParkingDisplay extends Component {
  constructor(props) {
    super(props);
    console.log("ParkingDisplayConstructor");
    console.log(this.props.parkingareas);
  }

  showParkingLots = () => {
    console.log("showParkingLots");
    const parkingareas = this.props.parkingareas;
    console.log(this.props.parkingareas)
    let table = []

    // Outer loop to create parent
    for (let x=0; x < parkingareas.length; x++) {
      console.log(parkingareas[x])
      table.push(
        <Row className="d-flex" key={x}>
          <div className="mr-auto p-2"><div style={{fontSize: '11pt'}}>{parkingareas[x]['name']}</div></div>
          <div className="mr-auto"><div style={{fontSize: '11pt'}}>{parkingareas[x]['occupancy']}/{parkingareas[x]['capacity']}</div></div>
          {/*<div className="p-2" xs={3}><Button variant={"link"} style={{fontSize: '11pt'}}>View</Button></div className="p-2">*/}
          <div className="p-2"><FaMapMarkedAlt className="display-icon" onClick={this.props.updateMapCenter.bind(this, parkingareas[x].lat, parkingareas[x].lng)}/></div>
          <div className="p-2"><FaTimes/></div>
        </Row>);
    }
    return table
  }

  render() {
    const { title } = this.props;
    return(
      <div style={{marginBottom:'20px'}}>
        <Row>{title}</Row>
        <Fragment>{this.showParkingLots()}</Fragment>
        <Row className="justify-content-xs-center"><Col/><Col xs="auto"><Button variant='primary'>Add Lot</Button></Col><Col/></Row>
      </div>
    );
  }
}

ParkingDisplay.defaultProps = {
  title: 'Lots',
  lotName: 'Test Lot 1',
  lotAddress: '200 University Ave W, Waterloo, ON N2L 3G1',
}