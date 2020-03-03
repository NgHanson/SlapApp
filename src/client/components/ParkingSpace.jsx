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
  }
  setupCanvas() {
    this.angle = this.props.place.geometry.rotation;
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Center the rectangle in the canvas
    this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
    // CW radians
    this.ctx.rotate((this.angle * Math.PI) / 180);
  }
  fromLatLngToPoint(latLng, map) { 
      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast()); 
      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest()); 
      var scale = Math.pow(2, map.getZoom()); 
      var worldPoint = map.getProjection().fromLatLngToPoint(latLng); 
      return new this.props.mapApi.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
  }
  getParkingSpaceDimensions() {
    var point = this.props.mapInstance.getCenter();
    var p1 = this.fromLatLngToPoint(this.props.mapInstance.getCenter(), this.props.mapInstance);
    // Hardcoded space size
    var myLatlng = new this.props.mapApi.LatLng(point.lat()+0.000011679022563271246,point.lng()+0.00003218650817871094);
    var p2 = this.fromLatLngToPoint(myLatlng, this.props.mapInstance);
  
    const rectWidth = Math.sqrt((p1.y-p2.y)*(p1.y-p2.y)+(p1.x-p2.x)*(p1.x-p2.x))*0.7;
    // Normal aspect ratio for a parking space
    const rectHeight = rectWidth*6.7/2.6;
    const rectX = -rectWidth / 2;
    const rectY = -rectHeight / 2;
    const thickness = 3;
    return {rectWidth, rectHeight, rectX, rectY, thickness};
  }
  drawSpaceBorder(rectX, rectY, rectWidth, rectHeight, thickness) {
    // Draw border rectangle
    this.ctx.fillStyle='#000';
    this.ctx.fillRect(rectX - (thickness), rectY - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
  }
  drawParkingSpaceBody(rectX, rectY, rectWidth, rectHeight) {
    // If the space is not active (sensor is not on), draw as Grey
    if (this.props.viewType == 2) {
      if (!this.props.place.active) {
        this.ctx.fillStyle = "#C2C5CC";
      } else if (this.props.place.occupied) {
        this.ctx.fillStyle = '#FFCCCB';
      } else {
        this.ctx.fillStyle = '#90EE90';
      }      
    } else if (this.props.viewType == 3) {
      if (this.props.place.analytics_percentage > 0) {
        this.ctx.fillStyle = '#90EE90';
      } else if (this.props.place.analytics_percentage < 0) {
        this.ctx.fillStyle = '#FFCCCB';
      } else {
        this.ctx.fillStyle = "#C2C5CC";
      }
    }

    this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);    
  }
  getTimeUpdateString(last_updated_str) {
    const last_updated = new Date(last_updated_str);
    const curr_time = new Date();
    const time_diff = new Date(curr_time - last_updated);
    const time_string = this.props.place.id + "\nLast Update:\n" + time_diff.getHours() + "h " + time_diff.getMinutes() + "m " + time_diff.getSeconds() + "s";
    return time_string
  }
  getAnalyticsPercentageString(percentage) {
    return this.props.place.id + "\n" + percentage + "%"
  }
  fillSpaceText(textBody, textX, textY) {
    // Fill rectangle with text
    this.ctx.font = "30 px monospace";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
     /// text color
    this.ctx.fillStyle = '#000';
    var lineheight = 15;
    var lines = textBody.split('\n');

    for (var i = 0; i<lines.length; i++)
      this.ctx.fillText(lines[i], textX, textY + (i*lineheight) );
  }
  componentDidUpdate(prevProps, prevState) {
    const {rectWidth, rectHeight, rectX, rectY, thickness} = this.getParkingSpaceDimensions();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawSpaceBorder(rectX, rectY, rectWidth, rectHeight, thickness);
    this.drawParkingSpaceBody(rectX, rectY, rectWidth, rectHeight);
    if (this.props.viewType == 2) {
      this.fillSpaceText(this.getTimeUpdateString(this.props.place.updated_date), 0, 0);  
    } else if (this.props.viewType == 3) {
      this.fillSpaceText(this.getAnalyticsPercentageString(this.props.place.analytics_percentage), 0, 0);
    }    
  }
  componentDidMount() {
    this.setupCanvas();
  }
  render() {
    return(
      <div>
        <canvas style={temp} ref={this.canvasRef} width={300} height={300} />
      </div>
    )
  }
}
