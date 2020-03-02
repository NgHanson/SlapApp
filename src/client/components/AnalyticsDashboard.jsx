import React, { Component } from 'react';

import { Chart } from "react-google-charts";
import { FaChartBar } from "react-icons/fa";

import * as Colour from '../../constants/colour_consts';

var lotName = 'UW LOT 1'; //MOVE TO PROP
var lotAddress = 'University Ave. & Phillip St.'
var lotTimeViolaters = 10;

const data1 = [
  ["Time", "Lot Occupancy", "Avg"],
  ["6am", 8, 10],
  ["7am", 10, 20],
  ["8am", 30, 40],
  ["9am", 70, 80],
  ["10am", 90, 100],
  ["11am", 90, 120],
  ["12pm", 106, 140],
  ["1pm", 104, 130],
  ["2pm", 102, 120],
  ["3pm", 96, 120],
  ["4pm", 90, 110],
  ["5pm", 72, 90],
  ["6pm", 40, 80],
  ["7pm", 30, 80],
  ["8pm", 30, 70],
  ["9pm", 20, 70],
  ["10pm", 10, 40],
  ["11pm", 10, 20],
  ["12am", 10, 20]
];

const options1 = {
  title: "Today's Hourly Lot Occupancy vs Avg for today",
  curveType: "function",
  legend: "none",
  hAxis: { showTextEvery: 4 },
};

const data2 = [
  ["Day", "Lot Occupancy"],
  ["Mon",120],
  ["Tues",140],
  ["Wed", 140],
  ["Thurs", 140],
  ["Fri", 120],
  ["Sat", 30],
  ["Sun", 27]
];

//should this be changed to % occupancy ...
const options2 = {
  title: "7-Day Rolling Max Occupancy",
  curveType: "function",
  legend: "none",
};

const data3 = [
  ["Day", "Avg Occupancy Time"],
  ["Mon",120],
  ["Tues",120],
  ["Wed", 120],
  ["Thurs", 120],
  ["Fri", 120],
  ["Sat", 60],
  ["Sun", 45]
];

const options3 = {
  title: "Daily Average Occupancy Time",
  curveType: "function",
  legend: "none",
};

//WEIGHTS SHOULD ADD UP TO MAIN OPERATION TIME
//ex. 9-5 main hours of op = 8*60 = 480 minutes
const pieData = [
  ["% Occupancy", "Weight"],
  ["100", 200],
  ["90-100", 80],
  ["75-90", 80],
  ["50-75", 60],
  ["0-50", 40],
];

const pieOptions = {
  title: "Occupancy % Distribution During Main Operation Hours",
  pieHole: 0.4,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};

export default class AnalyticsDashboard extends Component {
  constructor(props) {
    super(props);
  }

  // same graph
  // weekly parking durations
  // line graph for lot usage
  // number of people exceeding limit this week ...
  render() {
    return(
      <div style={{padding: '40px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <FaChartBar className="display-icon"/>
          <p style={{margin: '0 0 0 25px'}}>Analytics Dashboard</p>
          <p style={{margin: '0 0 0 25px'}}>{`${lotName}`}</p>
          <p style={{margin: '0 0 0 25px'}}>{`${lotAddress}`}</p>
        </div>
        <div style={{display: 'flex'}}>
          <div className={"left-chart-container"} style={{flex: 1}}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="300px"
              data={data1}
              options={options1}
            />
            <div className={"metrics-box"} style={{display: 'flex', height: '150px'}}>
              <div style={{background: Colour.YELLOW, flex: 1, margin: '0 20px 20px 20px', padding: '20px'}}>
                {`Current Lot Utilization ${95}%`}
              </div>
              <div style={{background: Colour.LIGHT_GREEN, flex: 1, margin: '0 20px 20px 20px', padding: '20px'}}>
                {`Avg Spot Free Time b/w Parking Events (During Main Hours): ${5} minutes`}
              </div>
            </div>
            <div className={"metrics-box"} style={{display: 'flex', height: '150px'}}>
              <div style={{background: Colour.LIGHT_RED, flex: 1, margin: '0 20px 20px 20px', padding: '20px'}}>
                {`Number of People Exceeding Time Limit Today ${lotTimeViolaters}`}
              </div>
              <div style={{background: Colour.LIGHT_GREEN, flex: 1, margin: '0 20px 20px 20px', padding: '20px'}}>
                {`Pods Requiring Servicing ${0}`}
              </div>
            </div>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="300px"
              data={data3}
              options={options3}
            />
          </div>
          <div className={"right-chart-container"} style={{flex: 1}}>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="300px"
              data={data2}
              options={options2}
            />
            <Chart
              chartType="PieChart"
              data={pieData}
              options={pieOptions}
              width={"100%"}
              height={"300px"}
            />
          </div>
        </div>
      </div>
    );
  }
}