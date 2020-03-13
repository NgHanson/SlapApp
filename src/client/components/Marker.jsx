import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { Chart } from "react-google-charts";
import { demoLotGraph, demoLotOccupancyOptions, lotOccupancyGraph, lotOccupancyOptions } from '../../constants/examples.js';
import * as Colour from '../../constants/colour_consts';
import { FaParking, FaRegClock } from "react-icons/fa";
import { MdLocalParking } from 'react-icons/md';

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
        {this.state.modalOpen && <MarkerModal 
          address={this.props.address} 
          notes={this.props.notes} 
          setMapsWrapperState={setMapsWrapperState}
          changeCurrentLot={changeCurrentLot} 
          lot_id={lot_id} 
          closeModal={this.closeModal} 
          userType={userType} 
          changeViewType={changeViewType} 
          viewType={viewType}/>}
        <div style={temp} onClick={()=>this.toggleModal()}>
          <div>
            <p style={{display: 'block', margin: 0}} >{this.props.text}</p>
            <p style={{display: 'block', margin: 0}} >{this.props.capacity - this.props.freeCount}/{this.props.capacity}</p>
          </div>
        </div>
      </div>
    );
  }
}

class MarkerModal extends Component {
  constructor(props) {
    super(props)
  }

  showDetails = () => {
      this.props.setMapsWrapperState({currentLotID: this.props.lot_id, viewType: 2})
  }

  generateMarkerGraph(lotId) {
    return (
      <div className={"chart-container"} style={{padding: '0 30px'}}>
        <Chart
          chartType="ColumnChart"
          width="360px"
          height="160px"
          data={lotId == 3 ? demoLotGraph : lotOccupancyGraph}
          options={lotId == 3 ? demoLotOccupancyOptions : lotOccupancyOptions}
        />
      </div>
    );
  }

  generateNotes() {
    let notes = this.props.notes.split("\\n");
    //debugger

    let divs = [];

    notes.forEach(n => {
      let note = n.trim();
      //debugger
      if ("Free Parking" == note) {
        divs.push(
          <div style={{display: 'flex', marginRight: '16px', alignItems: 'center'}}>
            <MdLocalParking style={{borderWidth: "2px", borderStyle: "solid", borderRadius: "7px", color: Colour.GREEN, fontSize: '30px'}} />
            <div style={{marginLeft: '8px', fontSize: '14px'}}>Free Parking</div>
          </div>
        );
      } else if ("Permit Only" == note) {
        divs.push(
          <div style={{display: 'flex', marginRight: '16px', alignItems: 'center'}}>
            <MdLocalParking style={{borderWidth: "2px", borderStyle: "solid", borderRadius: "7px", color: Colour.ORANGE, fontSize: '30px'}} />
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
      <div style={{display: 'flex'}}>
        {divs}
      </div>
    );

  }


  render() {
    const {
      closeModal,
      changeViewType,
      userType,
      viewType,
      address,
      notes,
      lot_id
    } = this.props;

    // More Details button brings you to the lot view
    /*
    Notes About lot ex. 2 hr max, paid parking, add a notes field to DB, if its marked as a 24hr lot maybe we wanna show diff
    occupation times, for ex. generally 6am - 12am vs Fit4Less parking lot which is 24 hr
    */
    return (
      <div className="dicks" style={{fontFamily: '', backgroundColor: Colour.BLUE_GREY, width:'fit-content', height: 'fit-content', border: `2px solid ${Colour.DARK_BLUE_GREY}`}} onClick={() => closeModal()}>
        <div style={{padding: '30px 30px 30px 30px', color: Colour.CLOUD, fontSize: 'medium'}}>
          {address}
        </div> 
        {this.generateMarkerGraph(lot_id)}
        <div style={{margin: '20px 30px 20px 30px', color: 'white', textAlign: 'left'}}>
          {this.generateNotes()}
        </div>
        <div style={{ padding: '0 30px 30px 30px'}}>
          <Button variant={"info"} style={{width: '100%', fontSize: '11pt', backgroundColor: Colour.ORANGE, borderColor: Colour.ORANGE}} onClick={() => this.showDetails()} >
            Details
          </Button>
        </div>
      </div>
    );
  }
}
