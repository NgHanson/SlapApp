import React, { Component } from 'react';

// Bootstrap Imports
import Button from 'react-bootstrap/Button';
import { FaCaretRight, FaCaretDown } from "react-icons/fa";

import { exHigherTraffic9To5, exBusierOnWeekdays, exMoralsNearDinner, exBusierOnValentines, exSingleTime } from '../../constants/examples.js';

import * as Colour from '../../constants/colour_consts';
import './analyticsselector.css';

const defaultState = {
      //SINGLE TIMEFRAME
      year: 0, 
      month: 0,
      day: 0,
      startHour: 0,
      startMin: 0,
      endHour: 0,
      endMin: 0,
      //COMPARE 2 TIMEFRAMES
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
      //toggles
      singleOpen: false,
      compareOpen: false,
}

export default class AnalyticsSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //SINGLE TIMEFRAME
      year: defaultState.year,
      month: defaultState.month,
      day: defaultState.day,
      startHour: defaultState.startHour,
      startMin: defaultState.startMin,
      endHour: defaultState.endHour,
      endMin: defaultState.endMin,
      //COMPARE 2 TIMEFRAMES
      fromYear: defaultState.fromYear,
      fromMonth: defaultState.fromMonth,
      fromDay: defaultState.fromDay,
      fromStartHour: defaultState.fromStartHour,
      fromStartMin: defaultState.fromStartMin,
      fromEndHour: defaultState.fromEndHour,
      fromEndMin: defaultState.fromEndMin,
      toYear: defaultState.toYear,
      toMonth: defaultState.toMonth,
      toDay: defaultState.toDay,
      toStartHour: defaultState.toStartHour,
      toStartMin: defaultState.toStartMin,
      toEndHour: defaultState.toEndHour,
      toEndMin: defaultState.toEndMin,
      //toggles
      singleOpen: defaultState.singleOpen,
      compareOpen: defaultState.compareOpen,
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  toggleSingleOpen() {
    this.setState((prevState) => ({
      singleOpen: !prevState.singleOpen,
    }));
  }

  toggleCompareOpen() {
    this.setState((prevState) => ({
      compareOpen: !prevState.compareOpen,
    }));
  }

  onSubmit(singleSubmit) {
    var selections = {
      isSingle: singleSubmit,
      //Single Compare
      year: this.state.year, 
      month: this.state.month,
      day: this.state.day,
      startHour: this.state.startHour,
      startMin: this.state.startMin,
      endHour: this.state.endHour,
      endMin: this.state.endMin,
      //Double Compare
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
    } else if (exNumber == 5) {
      currEx = exSingleTime;
    }

    if (exNumber == 5) {
      this.setState({
        year: currEx.year,
        month: currEx.month,
        day: currEx.day,
        startHour: currEx.startHour,
        startMin: currEx.startMin,
        endHour: currEx.endHour,
        endMin: currEx.endMin,
        //COMPARE 2 TIMEFRAMES
        fromYear: defaultState.fromYear,
        fromMonth: defaultState.fromMonth,
        fromDay: defaultState.fromDay,
        fromStartHour: defaultState.fromStartHour,
        fromStartMin: defaultState.fromStartMin,
        fromEndHour: defaultState.fromEndHour,
        fromEndMin: defaultState.fromEndMin,
        toYear: defaultState.toYear,
        toMonth: defaultState.toMonth,
        toDay: defaultState.toDay,
        toStartHour: defaultState.toStartHour,
        toStartMin: defaultState.toStartMin,
        toEndHour: defaultState.toEndHour,
        toEndMin: defaultState.toEndMin,
      });
    } else {
      this.setState({
        //SINGLE TIMEFRAME
        year: defaultState.year,
        month: defaultState.month,
        day: defaultState.day,
        startHour: defaultState.startHour,
        startMin: defaultState.startMin,
        endHour: defaultState.endHour,
        endMin: defaultState.endMin,
        // COMPARE 2 TIMEFRAMES
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
  }

  inputField(state, name, label=null) {
    return (
      <div style={{flexGrow: 1, margin: '0 2px'}}>
        {label && <div>{label}</div>}
        <input type="number" style={{width: '100%'}} value={state} name={name} onChange={(event) => this.handleChange(event)}/>
    </div>
    );
  }

  doubleLotExamples() {
    return (
      <div>
        <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(1)} >9-5 Traffic Comparison</Button>
        <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(2)} >Weekday Traffic Comparison</Button>
        <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(3)} >Dinner Time Traffic Comparison</Button>
        <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(4)} >Valentines Day Traffic Comparison</Button>
      </div>
    );
  }

  singleLotExamples() {
    return (
      <div>
        <Button variant={"info"} style={{fontSize: '11pt', width: '100%', marginTop: '10px'}} onClick={() => this.updateLotExample(5)} >Lot Occupancy for Time</Button>
      </div>
    );
  }

  singleCompare() {
    return(
      <div style={{ marginBottom: '30px'}}>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.year, 'year', 'Year')}
          {this.inputField(this.state.month, 'month', 'Month')}
          {this.inputField(this.state.day, 'day', 'Day')}
        </div>
        <div>Start Time</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.startHour, 'startHour')}
          {this.inputField(this.state.startMin, 'startMin')}
        </div>
        <div>End Time</div>
        <div style={{display: 'flex'}}>
          {this.inputField(this.state.endHour, 'endHour')}
          {this.inputField(this.state.endMin, 'endMin')}
        </div>
        {(this.props.currentLotID == 1) && this.singleLotExamples()}
        <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, width: '100%', marginTop: '10px'}} onClick={() => this.onSubmit(true)} >
          Submit
        </Button>
      </div>
    );
  }

  doubleCompare() {
    return (
      <div style={{ marginBottom: '30px'}}>
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
        {(this.props.currentLotID == 1) && this.doubleLotExamples()}
        <Button variant={"secondary"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE, width: '100%', marginTop: '10px'}} onClick={() => this.onSubmit(false)} >
          Submit
        </Button>
      </div>
    );
  }

  render() {
    return(
      <div className='analytics-selector'>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div>Single Timeframe</div>
          {this.state.singleOpen ? <FaCaretDown className="display-icon" onClick={() => this.toggleSingleOpen()}/> : <FaCaretRight className="display-icon"  onClick={() => this.toggleSingleOpen()}/>}
        </div>
        {this.state.singleOpen && this.singleCompare()}
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div>Compare Timeframes</div>
          {this.state.compareOpen ? <FaCaretDown className="display-icon" onClick={() => this.toggleCompareOpen()}/> : <FaCaretRight className="display-icon"  onClick={() => this.toggleCompareOpen()}/>}
        </div>
        {this.state.compareOpen && this.doubleCompare()}
        <Button variant={"secondary"} style={{fontSize: '11pt', width: '100%'}} onClick={() => this.props.changeViewType(1)} >
          Back
        </Button>
      </div>
    );
  }
}