import React, { Component } from 'react';
import './app.css';

import socketIOClient from "socket.io-client";
import GoogleMapWrapper from './GoogleMapWrapper';
// Import styles for react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

var socket;
export default class App extends Component {
  constructor(props) {
    super(props);

    //BE CAREFUL WITH THIS... on dev frontend is at 3000 but backend is routed to 8080
    //webpack.config.js
    socket = socketIOClient("http://localhost:8080/");
    this.state = {
      socketDeviceData: undefined,
      socketLotData: undefined,
    };
    // socket = socketIOClient();
  }

  componentDidMount() {
    var self = this;
    socket.on("DEVICE_DATA", function(data) {
      console.log(data); 
      self.setState({socketDeviceData: data});
    });
    socket.on('LOT_DATA', function(data) {
      console.log(data);
      self.setState({socketLotData: data});
    })
    // socket.on("testing", data => this.setState({ response: data }));
    // socket.on("testing", data => console.log("Socket.io... ", data))
  }

  render() {
    return (
      <div id="App" className="fill-window">
        <GoogleMapWrapper socketDeviceData={this.state.socketDeviceData} socketLotData={this.state.socketLotData}></GoogleMapWrapper>
      </div>
    );
  }
}
