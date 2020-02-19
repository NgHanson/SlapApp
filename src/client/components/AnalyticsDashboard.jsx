import React, { Component } from 'react';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './analyticsdashboard.css';

export default class AnalyticsDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='analytics-dashboard'>
        <Row>
          From:
        </Row>
        <Row>
          <Col xs={4}>
            <Row>Year</Row>
            <Row><input className="analytics-input" type="text" placeholder="Any"></input></Row>
          </Col>
          <Col xs={4}>
            <Row>Month</Row>
            <Row><input className="analytics-input" type="text" placeholder="Any"></input></Row>
          </Col>
          <Col xs={4}>
            <Row>Day</Row>
            <Row><input className="analytics-input" type="text" placeholder="Any"></input></Row>
          </Col>
        </Row>
        <Row>Start Time</Row>
        <Row>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="HH"></input>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="MM"></input>
          </Col>
        </Row>
        <Row>End Time</Row>
        <Row>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="HH"></input>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="MM"></input>
          </Col>
        </Row>
        <Row>
          To:
        </Row>
        <Row>
          <Col xs={4}>
            <Row>Year</Row>
            <Row><input className="analytics-input" type="text" placeholder="Any"></input></Row>
          </Col>
          <Col xs={4}>
            <Row>Month</Row>
            <Row><input className="analytics-input" type="text" placeholder="Any"></input></Row>
          </Col>
          <Col xs={4}>
            <Row>Day</Row>
            <Row><input className="analytics-input" type="text" placeholder="Any"></input></Row>
          </Col>
        </Row>
        <Row>Start Time</Row>
        <Row>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="HH"></input>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="MM"></input>
          </Col>
        </Row>
        <Row>End Time</Row>
        <Row>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="HH"></input>
          </Col>
          <Col xs={2}>:</Col>
          <Col xs={5}>
            <input className="analytics-input" type="text" placeholder="MM"></input>
          </Col>
        </Row>
      </div>
    );
  }
}