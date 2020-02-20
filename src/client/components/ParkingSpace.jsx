import React, { Component } from 'react';

// MOVE THESE INTO A CSS
// transform moves the canvas so it is centered around the mouse
const temp = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  cursor: 'pointer',
  border:'1px solid #d3d3d3',
};

const temp2 = {
  position: 'absolute',
  width: '160px',
  height: '240px',
  lineHeight: '50px',
  backgroundColor: '#fff',
  border:' 2px solid #fff',
  textAlign: 'center',
  cursor: 'pointer',
};

export default class ParkingSpace extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    const angle = 45;//this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const rectWidth = 50;
    const rectHeight = rectWidth*6.7/2.6;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    // Center the rectangle in the canvas
    ctx.translate(width/2, height/2);
    // radians
    ctx.rotate((angle * Math.PI) / 180);
    // ctx.fillStyle = '#4397AC';
    // ctx.fillRect(X, Y, Width, Height)
    ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
  }
  render() {
    return(
      <div>
        <canvas style={temp} ref={this.canvasRef} width={300} height={300} />
      </div>
    )
  }
}