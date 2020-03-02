import React, { Component } from 'react';

// Bootstrap Imports
import Button from 'react-bootstrap/Button';

import { exHigherTraffic9To5, exBusierOnWeekdays, exMoralsNearDinner, exBusierOnValentines } from '../../constants/examples.js';

import * as Colour from '../../constants/colour_consts';
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

  inputField(state, name, label=null) {
    return (
      <div style={{flexGrow: 1, margin: '0 2px'}}>
        {label && <div>{label}</div>}
        <input type="number" style={{width: '100%'}} value={state} name={name} onChange={(event) => this.handleChange(event)}/>
    </div>
    );
  }

  render() {
    return(
      <div className='analytics-selector'>
        <div>From:</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.fromYear, 'fromYear', 'Year')}
          {this.inputField(this.state.fromMonth, 'fromMonth', 'Month')}
          {this.inputField(this.state.fromDay, 'fromDay', 'Day')}
        </div>
        <div>Start Time</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.fromStartHour, 'fromStartHour')}
          {this.inputField(this.state.fromStartMin, 'fromStartMin')}
        </div>
        <div>End Time</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.fromEndHour, 'fromEndHour')}
          {this.inputField(this.state.fromEndMin, 'fromEndMin')}
        </div>
        <div>To:</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.toYear, 'toYear', 'Year')}
          {this.inputField(this.state.toMonth, 'toMonth', 'Month')}
          {this.inputField(this.state.toDay, 'toDay', 'Day')}
        </div>
        <div>Start Time</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.toStartHour, 'toStartHour')}
          {this.inputField(this.state.toStartMin, 'toStartMin')}
        </div>
        <div>End Time</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.toEndHour, 'toEndHour')}
          {this.inputField(this.state.toEndMin, 'toEndMin')}
        </div>
        {(this.props.currentLotID == 1) && <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(1)} >9-5 Traffic Comparison</Button>}
        {(this.props.currentLotID == 1) && <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(2)} >Weekday Traffic Comparison</Button>}
        {(this.props.currentLotID == 1) && <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(3)} >Dinner Time Traffic Comparison</Button>}
        {(this.props.currentLotID == 1) && <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(4)} >Valentines Day Traffic Comparison</Button>}
        <div style={{display: 'flex', margin: '10px 0'}}>
          <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, flexGrow: 1, marginRight: '2px'}} onClick={() => this.onSubmit()} >
            Submit
          </Button>
          <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, flexGrow: 1, marginLeft: '2px'}} onClick={() => this.props.changeViewType(1)} >
            Back
          </Button>
        </div>
      </div>
    );
  }
}