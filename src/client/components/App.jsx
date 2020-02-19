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
    this.state = {
      username: null,
      events: null,
    };

    //BE CAREFUL WITH THIS... on dev frontend is at 3000 but backend is routed to 8080
    //webpack.config.js
    socket = socketIOClient("http://localhost:8080/");
  }

  componentDidMount() {
    fetch('/api/event/all')
      .then(res => res.json())
      .then(res => this.setState({ events: res}));

    socket.on("DEVICE_DATA", data => console.log(data));
    //socket.on("testing", data => this.setState({ response: data }));
  }

  //TEST IF THE SIMPLE DB CALL WORKS (SHOULD DISPLAY SUCCESS)
  render() {
    const { username, events } = this.state;
    return (
      <div id="App" className="fill-window">
        <GoogleMapWrapper></GoogleMapWrapper>
        <div>
          {events ? <h1>DB SUCCESS</h1>: <h1>DB FAILED</h1> }
        </div>
      </div>
    );
  }
}
