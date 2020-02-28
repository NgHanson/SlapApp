import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Chart } from "react-google-charts";
import { lotOccupancyGraph } from './examples.js';

// MOVE THESE INTO A CSS
const temp = {
  position: 'absolute',
  width: '75px',
  height: '75px',
  left: '50%',
  top: '50%',
  backgroundColor: 'white',
  border:'2px solid #24305e',
  borderRadius: '100%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  toggleModal() {
    this.setState((prevState) => ({ modalOpen: !prevState.modalOpen}));
  }

  render() {
    const {
      changeViewType,
      userType,
      viewType,
      lot_id,
      changeCurrentLot
    } = this.props;

    return (
      <div>
        {this.state.modalOpen && <MarkerModal changeCurrentLot={changeCurrentLot} lot_id={lot_id} closeModal={this.closeModal} userType={userType} changeViewType={changeViewType} viewType={viewType}/>}
        <div style={temp} onClick={()=>this.toggleModal()}>
          <div>
            <p style={{display: 'block', margin: 0}} >{this.props.text}</p>
            <p style={{display: 'block', margin: 0}} >10/100</p>
          </div>
        </div>
      </div>
    );
  }
}

const options = {
  title: "Occupancy",
  legend: "none",
  hAxis: { showTextEvery: 4 },
  vAxis: { maxValue: 140 }, //this DN work?
  isStacked: true,
  series: {
    0:{color:'#FF6B6B'},
    1:{color:'#4ECDC4'},
  }
};

class MarkerModal extends Component {
  constructor(props) {
    super(props)
  }
  showDetails = () => {
      this.props.changeCurrentLot(this.props.lot_id);
      this.props.changeViewType(2);       
  }
  render() {
    const {
      closeModal,
      changeViewType,
      userType,
      viewType,
    } = this.props;

    // More Details button brings you to the lot view
    /*
    Notes About lot ex. 2 hr max, paid parking, add a notes field to DB, if its marked as a 24hr lot maybe we wanna show diff
    occupation times, for ex. generally 6am - 12am vs Fit4Less parking lot which is 24 hr
    */
    return (
      <div style={{backgroundColor:'#fff', width:'fit-content', height: 'fit-content', border: '2px solid #24305e'}} onClick={() => closeModal()}>
        <div className={"chart-container"}>
          <Chart
            chartType="ColumnChart"
            width="360px"
            height="160px"
            data={lotOccupancyGraph}
            options={options}
          />
        </div>
        <div style={{margin: '5px'}}>
          Note: Free Parking, 2 HR Max
        </div>
        <div style={{width: '70px', margin: '0 auto', paddingBottom: '5px'}}>
          <Button variant={"info"} style={{fontSize: '11pt'}} onClick={() => this.showDetails()} >
            Details
          </Button>
        </div>
      </div>
    );
  }
}
