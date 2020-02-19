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
  }

  componentDidMount() {
    socket.on("DEVICE_DATA", data => console.log(data));
    //socket.on("testing", data => this.setState({ response: data }));
  }

  render() {
    return (
      <div id="App" className="fill-window">
        <GoogleMapWrapper></GoogleMapWrapper>
      </div>
    );
  }
}
