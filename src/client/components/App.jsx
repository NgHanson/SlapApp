import React, { Component } from 'react';
import './app.css';
import NavBar from './NavBar';
import ParkingDisplay from './ParkingDisplay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      events: null,
    };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    fetch('/api/event/all')
      .then(res => res.json())
      .then(res => this.setState({ events: res}));
  }

  //TEST IF THE SIMPLE DB CALL WORKS (SHOULD DISPLAY SUCCESS)
  render() {
    const { username, events } = this.state;
    return (
      <div>
        <NavBar></NavBar>
        <div>
          {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        </div>
        <div>
          {events ? <h1>SUCCESS</h1>: <h1>FAILED</h1> }
        </div>
        <ParkingDisplay></ParkingDisplay>
      </div>
    );
  }
}
