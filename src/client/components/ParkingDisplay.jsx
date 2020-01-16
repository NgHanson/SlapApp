import React, { Component } from 'react';
import './parkingdisplay.css';

export default class ParkingDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lotName, lotAddress } = this.props;
    return(
      <div className="parking-display">
        <div className='parking-lot-name'>Lot: {lotName}</div>
        <div className='parking-lot-address'>Address: {lotAddress}</div>
      </div>
    );
  }
}

ParkingDisplay.defaultProps = {
  lotName: 'Test Lot 1',
  lotAddress: '200 University Ave W, Waterloo, ON N2L 3G1',
}