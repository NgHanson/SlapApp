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

export default class ParkingSpace extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    console.log("ParkingSpaceConstructor")
    console.log(this.props);
  }
  componentDidMount() {
    const angle = this.props.place.geometry.rotation;
    if (angle !== -26.76691451) {
      console.log(this.props.place)
      console.error("feiafoeiajiofoijfaejio")

    }
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const rectWidth = 50;
    // Normal aspect ratio for a parking space
    const rectHeight = rectWidth*6.7/2.6;
    const rectX = -rectWidth / 2;
    const rectY = -rectHeight / 2;
    const thickness = 3;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    // Center the rectangle in the canvas
    ctx.translate(width/2, height/2);
    // CW radians
    ctx.rotate((angle * Math.PI) / 180);
    // Draw border rectangle
    ctx.fillStyle='#000';
    ctx.fillRect(rectX - (thickness), rectY - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
    // Draw actual parking space
    if (this.props.place.active) {
      ctx.fillStyle = '#FFCCCB';
    } else {
      ctx.fillStyle = '#90EE90';
    }
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    
  }
  render() {
    return(
      <div>
        <canvas style={temp} ref={this.canvasRef} width={150} height={150} />
      </div>
    )
  }
}
