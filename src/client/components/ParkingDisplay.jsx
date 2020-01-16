import React, { Component } from 'react';
import './parkingdisplay.css';

export default class ParkingDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lotName } = this.props;
    return(
      <div className="parking-display">
        <div className='parking-display-title'>Lot: {lotName}</div>
      </div>
    );
  }
}

ParkingDisplay.defaultProps = {
  lotName: 'Test Lot 1',
}