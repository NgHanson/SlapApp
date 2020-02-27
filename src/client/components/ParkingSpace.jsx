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
  setupCanvas() {
    const angle = this.props.place.geometry.rotation;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Center the rectangle in the canvas
    ctx.translate(canvas.width/2, canvas.height/2);
    // CW radians
    ctx.rotate((angle * Math.PI) / 180);
    return {canvas, ctx};
  }
  getParkingSpaceDimensions() {
    const rectWidth = 50;
    // Normal aspect ratio for a parking space
    const rectHeight = rectWidth*6.7/2.6;
    const rectX = -rectWidth / 2;
    const rectY = -rectHeight / 2;
    const thickness = 3;
    return {rectWidth, rectHeight, rectX, rectY, thickness};
  }
  drawSpaceBorder(ctx, rectX, rectY, rectWidth, rectHeight, thickness) {
    // Draw border rectangle
    ctx.fillStyle='#000';
    ctx.fillRect(rectX - (thickness), rectY - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
  }
  drawParkingSpaceBody(ctx, rectX, rectY, rectWidth, rectHeight) {
    // Draw actual parking space
    if (this.props.place.active) {
      ctx.fillStyle = '#FFCCCB';
    } else {
      ctx.fillStyle = '#90EE90';
    }
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);    
  }
  fillSpaceText(ctx, textBody, textX, textY) {
    // Fill rectangle with text
    ctx.font = "30 px monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
     /// text color
    ctx.fillStyle = '#000';
    /// draw text on top
    ctx.fillText(textBody, textX, textY);    
  }
  componentDidMount() {
    const {rectWidth, rectHeight, rectX, rectY, thickness} = this.getParkingSpaceDimensions();
    const {canvas, ctx} = this.setupCanvas();
    this.drawSpaceBorder(ctx, rectX, rectY, rectWidth, rectHeight, thickness);
    this.drawParkingSpaceBody(ctx, rectX, rectY, rectWidth, rectHeight);
    this.fillSpaceText(ctx, "yeet", 0, 0);
  }
  render() {
    return(
      <div>
        <canvas style={temp} ref={this.canvasRef} width={150} height={150} />
      </div>
    )
  }
}
