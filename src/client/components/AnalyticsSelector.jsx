import React, { Component } from 'react';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { exHigherTraffic9To5, exBusierOnWeekdays, exMoralsNearDinner, exBusierOnValentines } from './examples.js';

import './analyticsselector.css';

export default class AnalyticsSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromYear: 0,
      fromMonth: 0,
      fromDay: 0,
      fromStartHour: 0,
      fromStartMin: 0,
      fromEndHour: 0,
      fromEndMin: 0,
      toYear: 0,
      toMonth: 0,
      toDay: 0,
      toStartHour: 0,
      toStartMin: 0,
      toEndHour: 0,
      toEndMin: 0,
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  onSubmit() {
    var selections = {
      fromYear: this.state.fromYear,
      fromMonth: this.state.fromMonth,
      fromDay: this.state.fromDay,
      fromStartHour: this.state.fromStartHour,
      fromStartMin: this.state.fromStartMin,
      fromEndHour: this.state.fromEndHour,
      fromEndMin: this.state.fromEndMin,
      toYear: this.state.toYear,
      toMonth: this.state.toMonth,
      toDay: this.state.toDay,
      toStartHour: this.state.toStartHour,
      toStartMin: this.state.toStartMin,
      toEndHour: this.state.toEndHour,
      toEndMin: this.state.toEndMin,
    }

    this.props.setAnalyticsSelections(selections);
  }

  //LOAD THIS WITH YOUR VALUES
  // onButtonOnePress() {
  //   this.setState({
  //     fromYear: 2020,
  //     fromMonth: 1,
  //     fromDay: 1,
  //     fromStartHour: 0,
  //     fromStartMin: 0,
  //     fromEndHour: 0,
  //     fromEndMin: 0,
  //     toYear: 2020,
  //     toMonth: 1,
  //     toDay: 1,
  //     toStartHour: 0,
  //     toStartMin: 0,
  //     toEndHour: 0,
  //     toEndMin: 0
  //   });
  // }
  updateLotExample(exNumber)  {
    let currEx = null;
    if (exNumber == 1) {
      currEx = exHigherTraffic9To5;
    } else if (exNumber == 2) {
      currEx = exBusierOnWeekdays;
    } else if (exNumber == 3) {
      currEx = exMoralsNearDinner;
    } else if (exNumber == 4) {
      currEx = exBusierOnValentines;
    }
    this.setState({
      fromYear: currEx.first.year,
      fromMonth: currEx.first.month,
      fromDay: currEx.first.day,
      fromStartHour: currEx.first.startH,
      fromStartMin: currEx.first.startM,
      fromEndHour: currEx.first.endH,
      fromEndMin: currEx.first.endM,
      toYear: currEx.second.year,
      toMonth: currEx.second.month,
      toDay: currEx.second.day,
      toStartHour: currEx.second.startH,
      toStartMin: currEx.second.startM,
      toEndHour: currEx.second.endH,
      toEndMin: currEx.second.endM
    });
  }

  render() {
    return(
      <div className='analytics-dashboard'>
        <Row>
          From:
        </Row>
        <Row>
          <Col xs={4}>
            <Row>Year</Row>
            <Row>
              <input type="number" name={'fromYear'} placeholder={'Any'} onChange={(event) => this.handleChange(event)}/>
            </Row>
          </Col>
          <Col xs={4}>
            <Row>Month</Row>
            <Row>
              <input type="number" name={'fromMonth'} placeholder={'Any'} onChange={(event) => this.handleChange(event)}/>
            </Row>
            </Col>
          <Col xs={4}>
            <Row>Day</Row>
            <Row>
              <input type="number" name={'fromDay'} placeholder={'Any'} onChange={(event) => this.handleChange(event)}/>
            </Row>
          </Col>
        </Row>
        <Row>Start Time</Row>
        <Row>
          <Col xs={5}>
            <input type="number" name={'fromStartHour'} placeholder={'HH'} defaultValue={this.state.fromStartHour} onChange={(event) => this.handleChange(event)}/>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input type="number" name={'fromStartMin'} placeholder={'MM'} onChange={(event) => this.handleChange(event)}/>
          </Col>
        </Row>
        <Row>End Time</Row>
        <Row>
          <Col xs={5}>
          <input type="number" name={'fromEndHour'} placeholder={'HH'} onChange={(event) => this.handleChange(event)}/>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
          <input type="number" name={'fromEndMin'} placeholder={'MM'} onChange={(event) => this.handleChange(event)}/>
          </Col>
        </Row>
        <Row>
          To:
        </Row>
        <Row>
          <Col xs={4}>
            <Row>Year</Row>
            <Row>
              <input type="number" name={'toYear'} placeholder={'Any'} onChange={(event) => this.handleChange(event)}/>
            </Row>
          </Col>
          <Col xs={4}>
            <Row>Month</Row>
            <Row>
              <input type="number" name={'toMonth'} placeholder={'Any'} onChange={(event) => this.handleChange(event)}/>
            </Row>
            </Col>
          <Col xs={4}>
            <Row>Day</Row>
            <Row>
              <input type="number" name={'toDay'} placeholder={'Any'} onChange={(event) => this.handleChange(event)}/>
            </Row>
          </Col>
        </Row>
        <Row>Start Time</Row>
        <Row>
          <Col xs={5}>
            <input type="number" name={'toStartHour'} placeholder={'HH'} onChange={(event) => this.handleChange(event)}/>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input type="number" name={'toStartMin'} placeholder={'MM'} onChange={(event) => this.handleChange(event)}/>
          </Col>
        </Row>
        <Row>End Time</Row>
        <Row>
          <Col xs={5}>
            <input type="number" name={'toEndHour'} placeholder={'HH'} onChange={(event) => this.handleChange(event)}/>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input type="number" name={'toEndMin'} placeholder={'MM'} onChange={(event) => this.handleChange(event)}/>
          </Col>
        </Row>
        <Button variant={"secondary"} style={{fontSize: '11pt'}} onClick={() => this.onSubmit()} >
          Submit
        </Button>
        {(this.props.currentLotID == 1) && <Row><Button variant={"info"} style={{fontSize: '11pt'}} onClick={() => this.updateLotExample(1)} >9-5 Traffic Comparison</Button></Row>}
        {(this.props.currentLotID == 1) && <Row><Button variant={"info"} style={{fontSize: '11pt'}} onClick={() => this.updateLotExample(2)} >Weekday Traffic Comparison</Button></Row>}
        {(this.props.currentLotID == 1) && <Row><Button variant={"info"} style={{fontSize: '11pt'}} onClick={() => this.updateLotExample(3)} >Dinner Time Traffic Comparison</Button></Row>}
        {(this.props.currentLotID == 1) && <Row><Button variant={"info"} style={{fontSize: '11pt'}} onClick={() => this.updateLotExample(4)} >Valentines Day Traffic Comparison</Button></Row>}
      </div>
    );
  }
}