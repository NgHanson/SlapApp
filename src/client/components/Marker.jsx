import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Chart } from "react-google-charts";
import { lotOccupancyGraph } from '../../constants/examples.js';
import * as Colour from '../../constants/colour_consts';

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
      changeCurrentLot,
      setMapsWrapperState
    } = this.props;

    return (
      <div>
        {this.state.modalOpen && <MarkerModal setMapsWrapperState={setMapsWrapperState}changeCurrentLot={changeCurrentLot} lot_id={lot_id} closeModal={this.closeModal} userType={userType} changeViewType={changeViewType} viewType={viewType}/>}
        <div style={temp} onClick={()=>this.toggleModal()}>
          <div>
            <p style={{display: 'block', margin: 0}} >{this.props.text}</p>
            <p style={{display: 'block', margin: 0}} >{this.props.freeCount}/{this.props.capacity}</p>
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
    0:{color: Colour.LIGHT_RED},
    1:{color: Colour.LIGHT_BLUE},
  }
};

class MarkerModal extends Component {
  constructor(props) {
    super(props)
  }
  showDetails = () => {
      this.props.setMapsWrapperState({currentLotID: this.props.lot_id, viewType: 2})
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
      <div style={{backgroundColor: Colour.BLUE_GREY, width:'fit-content', height: 'fit-content', border: `2px solid ${Colour.DARK_BLUE_GREY}`}} onClick={() => closeModal()}>
        <div className={"chart-container"} style={{padding: '30px'}}>
          <Chart
            chartType="ColumnChart"
            width="360px"
            height="160px"
            data={lotOccupancyGraph}
            options={options}
          />
        </div>
        <div style={{margin: '0 30px 20px 30px', color: 'white'}}>
          <p>{`Address: `}</p>
          <p>Notes: Free Parking, 2 HR Max</p>
        </div>
        <div style={{width: '70px', margin: '0 auto', paddingBottom: '30px'}}>
          <Button variant={"info"} style={{fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE}} onClick={() => this.showDetails()} >
            Details
          </Button>
        </div>
      </div>
    );
  }
}
