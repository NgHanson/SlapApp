import React, { Component } from 'react';
import './app.css';
import GoogleMapWrapper from './GoogleMapWrapper';
// Import styles for react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      events: null,
    };
  }

  componentDidMount() {
    fetch('/api/event/all')
      .then(res => res.json())
      .then(res => this.setState({ events: res}));
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
