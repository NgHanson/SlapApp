// React Imports
import React, { Component, Fragment } from 'react';

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
      table.push(
        <Row key={x}>
          <Col xs={6} style={{fontSize: '11pt'}}>{parkingareas[x]['name']}</Col>
          <Col xs={3}style={{fontSize: '11pt'}}>{parkingareas[x]['occupied']}/{parkingareas[x]['capacity']}</Col>
          <Col xs={3}><Button variant={"link"} style={{fontSize: '11pt'}}>View</Button></Col>
        </Row>);
    }
    return table
  }

  render() {
    const { lotName, lotAddress } = this.props;
    return(
      <Fragment>
        <Row>My Lots</Row>
        <Row>{this.showParkingLots()}</Row>
        <Row className="justify-content-xs-center"><Col/><Col xs="auto"><Button variant='primary'>Add Lot</Button></Col><Col/></Row>
      </Fragment>
    );
  }
}

ParkingDisplay.defaultProps = {
  lotName: 'Test Lot 1',
  lotAddress: '200 University Ave W, Waterloo, ON N2L 3G1',
}