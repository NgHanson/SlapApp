import React, { Component } from 'react';

import { Chart } from "react-google-charts";
import { FaChartBar, FaPercent } from "react-icons/fa";

import * as Colour from '../../constants/colour_consts';

var lotName = 'UW LOT 1'; //MOVE TO PROP
var lotAddress = 'University Ave. & Phillip St.'
var lotTimeViolaters = 10;

const data1 = [
  ["Time", "Lot Occupancy", "Avg"],
  ["6am", 6, 10],
  ["7am", 8, 20],
  ["8am", 35, 30],
  ["9am", 40, 40],
  ["10am", 42, 45],
  ["11am", 43, 45],
  ["12pm", 47, 50],
  ["1pm", 50, 50],
  ["2pm", 50, 50],
  ["3pm", 27, 43],
  ["4pm", 35, 41],
  ["5pm", 46, 47],
  ["6pm", 40, 44],
  ["7pm", 47, 49],
  ["8pm", 45, 49],
  ["9pm", 42, 40],
  ["10pm", 35, 30],
  ["11pm", 22, 20],
  ["12am", 10, 10]
];

const options1 = {
  title: "Rolling Hourly Vs. Avg. Hourly Occupancy",
  titlePosition: "center",
  curveType: "function",
  legend: {position: 'bottom', textStyle: {color: Colour.CLOUD, fontSize: 16}},
  backgroundColor: Colour.BLUE_GREY,
  hAxis: {
    showTextEvery: 4,
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  vAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  titleTextStyle: {
    color: Colour.CLOUD,
  },
  colors: [Colour.BLUE, Colour.RED],
};

const data2 = [
  ["Day", "Lot Occupancy"],
  ["Mon",47],
  ["Tues",50],
  ["Wed", 50],
  ["Thurs", 50],
  ["Fri", 50],
  ["Sat", 42],
  ["Sun", 37]
];

//should this be changed to % occupancy ...
const options2 = {
  title: "7-Day Rolling Max Occupancy",
  curveType: "function",
  legend: "none",
  backgroundColor: Colour.BLUE_GREY,
  hAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  vAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  titleTextStyle: {
    color: Colour.CLOUD,
  },
  colors: [Colour.ORANGE],
};

const data3 = [
  ["Day", "Avg Occupancy Time"],
  ["Mon",75],
  ["Tues",90],
  ["Wed", 85],
  ["Thurs", 100],
  ["Fri", 60],
  ["Sat", 500],
  ["Sun", 200]
];

const options3 = {
  title: "Daily Average Occupancy Time (min)",
  curveType: "function",
  legend: "none",
  backgroundColor: Colour.BLUE_GREY,
  hAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  vAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  titleTextStyle: {
    color: Colour.CLOUD,
  },
  colors: [Colour.BLUE],
};

const data4 = [
  ["Day", "Avg Occupancy Time"],
  ["Mon",500],
  ["Tues",240],
  ["Wed", 480],
  ["Thurs", 400],
  ["Fri", 320],
  ["Sat", 900],
  ["Sun", 300]
];

const options4 = {
  title: "Daily Max Occupancy Time (min)",
  curveType: "function",
  legend: "none",
  backgroundColor: Colour.BLUE_GREY,
  hAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  vAxis: {
    textStyle: {
      color: Colour.CLOUD,
    }
  },
  titleTextStyle: {
    color: Colour.CLOUD,
  },
  colors: [Colour.BLUE],
};

//WEIGHTS SHOULD ADD UP TO MAIN OPERATION TIME
//ex. 9-5 main hours of op = 8*60 = 480 minutes
const pieData = [
  ["% Occupancy", "Weight"],
  ["100% Occupied", 200],
  ["90-100% Occupied", 80],
  ["75-90% Occupied", 80],
  ["50-75% Occupied", 60],
  ["0-50% Occupied", 40],
];

const pieOptions = {
  title: "Parking Space Occupancy Freq. Distribution (9am-5pm)",
  pieHole: 0.4,
  backgroundColor: Colour.BLUE_GREY,
  slices: [
    { color: "#2BB673" },
    { color: "#d91e48" },
    { color: "#007fad" },
    { color: "#e9a227" }
  ],
  legend: {
    position: "right",
    alignment: "center",
    textStyle: {
      color: Colour.CLOUD,
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  titleTextStyle: {
    color: Colour.CLOUD,
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
      <div className={'analytics-dashboard'} style={{ background: Colour.DARK_BLUE_GREY }}>
        <div style={{marginLeft: '300px'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', color: 'white'}}>
            <h3 style={{margin: '0 0 0 25px'}}>{`Analytics Dashboard for ${this.props.lots[this.props.currentLotID]['name']}`}</h3>
            <h3>{`(${this.props.lots[this.props.currentLotID]['address']})`}</h3>
          </div>
          <div style={{padding: '0 40px 40px 40px', background: Colour.DARK_BLUE_GREY}}>
            <div style={{display: 'flex'}}>
              <div className={"left-chart-container"} style={{flex: 1}}>
                <div style={{margin: '20px'}}>
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="300px"
                    data={data1}
                    options={options1}
                  />
                </div>
                <div className={"metrics-box"} style={{display: 'flex', height: '150px'}}>
                  <div style={{background: Colour.BLUE_GREY, flex: 1, margin: '0 20px 20px 20px', padding: '20px'}}>
                    <div style={{color: Colour.CLOUD}}>Current Lot Utilization</div>
                    <div style={{color: Colour.YELLOW, fontSize: '55px', textAlign: 'center'}}>95<FaPercent style={{fontSize: '20px', marginBottom: '10px'}}/></div>
                  </div>
                  <div style={{background: Colour.BLUE_GREY, flex: 1, margin: '0 20px 20px 20px', padding: '20px'}}>
                    <div style={{color: Colour.CLOUD}}>Avg Occupancy Duration (9am-5pm)</div>
                    <div style={{color: Colour.LIGHT_GREEN, fontSize: '55px', textAlign: 'center'}}>5 mins</div>
                  </div>
                </div>
                <div className={"metrics-box"} style={{display: 'flex', height: '150px'}}>
                  <div style={{background: Colour.BLUE_GREY, flex: 1, margin: '20px 20px 0px 20px', padding: '20px'}}>
                    <div style={{color: Colour.CLOUD}}>People Exceeding Time Limit (Today)</div>
                    <div style={{color: Colour.LIGHT_RED, fontSize: '55px', textAlign: 'center'}}>{lotTimeViolaters}</div>
                  </div>
                  <div style={{background: Colour.BLUE_GREY, flex: 1, margin: '20px 20px 0px 20px', padding: '20px'}}>
                    <div style={{color: Colour.CLOUD}}>Pods Requiring Servicing</div>
                    <div style={{color: Colour.LIGHT_GREEN, fontSize: '55px', textAlign: 'center'}}>0</div>
                  </div>
                </div>
                <div style={{margin: '20px'}}>
                  <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="300px"
                    data={data3}
                    options={options3}
                  />
                </div>
              </div>
              <div className={"right-chart-container"} style={{flex: 1}}>
                <div style={{margin: '20px'}}>
                  <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="300px"
                    data={data2}
                    options={options2}
                  />
                </div>
                <div style={{margin: '20px'}}>
                  <Chart
                    chartType="PieChart"
                    data={pieData}
                    options={pieOptions}
                    width={"100%"}
                    height={"300px"}
                  />
                </div>
                <div style={{margin: '20px'}}>
                  <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="300px"
                    data={data4}
                    options={options4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// , flexDirection: 'column'