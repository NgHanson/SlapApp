const Colour = require('./colour_consts.js');

// Live View - Lot Occcupancy ======================================================================================================

const demoLotGraph = [
	["Time", "Avg", "Current"],
  ["10am", 0, 0],
  ["11am", 1, 0],
  ["12pm", 1, 0],
  ["1pm", 2, 0],
	["2pm", 2, 0],
	["3pm", 2, 0],
  ["4pm", 1, 0],
  ["5pm", 0, 0]
];

const demoLotOccupancyOptions = {
	chartType:"ComboChart",
  title: "Occupancy",
	legend: "none",
	hAxis: { showTextEvery: 2 },
  vAxis: { maxValue: 4 }, //this DN work?
  isStacked: true,
  stackSeries: true,
  seriesType: "bars",
  series: {
    1:{color: Colour.LIGHT_RED, targetAxisIndex: 1, dataOpacity: 0.8},
    0:{color: Colour.LIGHT_BLUE, targetAxisIndex: 0},
  }
}


// IMPORTANT: Data is displayed back to front in a layered bar chart!
//            (We want the averages to be in the back, not the current val)
const lotOccupancyGraph = [
  ["Time", "Avg", "Current"],
  ["6am", 10, 0],
  ["7am", 20, 0],
  ["8am", 30, 0],
  ["9am", 40, 0],
  ["10am", 45, 0],
  ["11am", 45, 0],
  ["12pm", 50, 0],
  ["1pm", 50, 0],
  ["2pm", 50, 0],
  ["3pm", 43, 36], //NEED TO DO MATH TO FIGURE THIS OUT
  ["4pm", 41, 0],
  ["5pm", 47, 0],
  ["6pm", 44, 0],
  ["7pm", 49, 0],
  ["8pm", 49, 0],
  ["9pm", 40, 0],
  ["10pm", 30, 0],
  ["11pm", 20, 0],
  ["12am", 10, 0]
];

const lotOccupancyOptions = {
  chartType:"ComboChart",
  title: "Occupancy",
  legend: "none",
  hAxis: { showTextEvery: 4 },
  vAxis: { maxValue: 55 }, //this DN work?
  isStacked: true,
  stackSeries: true,
  seriesType: "bars",
  series: {
    1:{color: Colour.LIGHT_RED, targetAxisIndex: 1, dataOpacity: 0.8},
    0:{color: Colour.LIGHT_BLUE, targetAxisIndex: 0},
  }
};

// ================================================================================================================================

// Analytics View - Time Comparisons ==============================================================================================

// Example: Higher Traffic 9-5
const exHigherTraffic9To5 = {
	first: {
		year: "",
		month: 2,
		day: 13,
		startH: 9,
		startM: 0,
		endH: 17,
		endM: 0,
	},
	second: {
		year: "",
		month: 2,
		day: 13,
		startH: 17,
		startM: 0,
		startS: 0,
		endH: 9,
		endM: 0,
		endS: 0
	},
	lotValues: {
		"1": 10.8,
		"2": 11.1,
		"3": 12.2,
		"4": 12,
		"5": 4.5,
		"6": 13.6,
		"7": 15.5,
		"8": 3.6,
		"9": 7.1,
		"10": 9.9,
		"11": 12.4,
		"12": 8.4,
		"13": 9.4,
		"14": 9.3,
		"15": 5.9,
		"16": 9.2,
		"17": 11,
		"18": 7.5,
		"19": 6.9,
		"20": 13.3,
		"21": 9.1,
		"22": 4.1,
		"23": 9.1,
		"24": 6.6,
		"25": 5.6,
		"26": 13.6,
		"27": 11.8,
		"28": 0.3,
		"29": 8.9,
		"30": 10.5,
		"31": 7.8,
		"32": 6.6,
		"33": 24.1,
		"34": 15.8,
		"35": -4.4,
		"36": 0.4,
		"37": 7.1,
		"38": 8.1,
		"39": 2.7,
		"40": 16.8,
		"41": 15.1,
		"42": 10,
		"43": 13.3,
		"44": 12.6,
		"45": 14.9,
		"46": 15.9,
		"47": 16.9,
		"48": 9.1,
		"49": 13.6,
		"50": 9.1,
	}
};

// Example: Busier on Weekdays
const exBusierOnWeekdays = {
	first: {
		year: "",
		month: 2,
		day: 13,
		startH: 9,
		startM: 0,
		endH: 17,
		endM: 0
	},
	second: {
		year: "",
		month: 2,
		day: 15,
		startH: 9,
		startM: 0,
		endH: 17,
		endM: 0
	},
	lotValues: {
		"1": 5,
		"2": 6,
		"3": 9.5,
		"4": 7.4,
		"5": 11.4,
		"6": 11.3,
		"7": 8.5,
		"8": 13.5,
		"9": 5.8,
		"10": 7.2,
		"11": 7.4,
		"12": 7.2,
		"13": 5.1,
		"14": 13.6,
		"15": 7.9,
		"16": 7.3,
		"17": 11.8,
		"18": 3,
		"19": 9.9,
		"20": 11.4,
		"21": 9.8,
		"22": 24.8,
		"23": 10.3,
		"24": 1.7,
		"25": 13.8,
		"26": 6.5,
		"27": 7.1,
		"28": 5.5,
		"29": 14.7,
		"30": 3.7,
		"31": 3.7,
		"32": 10,
		"33": 12.3,
		"34": 15.6,
		"35": 21.6,
		"36": 9.8,
		"37": 13.2,
		"38": 10.3,
		"39": 14.1,
		"40": 12.3,
		"41": 6.2,
		"42": 9.5,
		"43": 6,
		"44": 8.6,
		"45": 3.7,
		"46": 17.3,
		"47": 9.7,
		"48": 7.1,
		"49": 20.1,
		"50": 8.7,
	}
};

// Example: Busier near Morals village around dinner time
const exMoralsNearDinner = {
	first: {
		year: "",
		month: 2,
		day: 14,
		startH: 17,
		startM: 0,
		endH: 21,
		endM: 0
	},
	second: {
		year: "",
		month: 2,
		day: 14,
		startH: 9,
		startM: 0,
		endH: 17,
		endM: 0
	},
	lotValues: {
		"1": -8,
		"2": -3,
		"3": -4,
		"4": -10,
		"5": -3,
		"6": 0.5,
		"7": -1,
		"8": -4,
		"9": 2,
		"10": 0.01,
		"11": 2,
		"12": 4,
		"13": 8,
		"14": 14,
		"15": 12,
		"16": 18,
		"17": 20,
		"18": -1,
		"19": -1,
		"20": -0.9,
		"21": -6,
		"22": -15,
		"23": -0.5,
		"24": 1,
		"25": 0.8,
		"26": 6,
		"27": 6,
		"28": 8,
		"29": 10,
		"30": 15,
		"31": -18,
		"32": -16,
		"33": -15,
		"34": -10,
		"35": -12,
		"36": -10,
		"37": -5,
		"38": -1,
		"39": 0,
		"40": 3,
		"41": 3,
		"42": 6,
		"43": 10,
		"44": 16,
		"45": 14,
		"46": 10,
		"47": 5,
		"48": 5,
		"49": 2,
		"50": 1.8,
	}
};

// Entire parking lot was busier on valentines day
const exBusierOnValentines = {
	first: {
		year: "",
		month: 2,
		day: 14,
		startH: 17,
		startM: 0,
		endH: 21,
		endM: 0
	},
	second: {
		year: "",
		month: 2,
		day: 7,
		startH: 17,
		startM: 0,
		endH: 21,
		endM: 0
	},
	lotValues: {
		"1": 9.2,
		"2": 4.5,
		"3": 6,
		"4": 11.2,
		"5": 9,
		"6": 5.6,
		"7": 12,
		"8": 0.6,
		"9": 15.4,
		"10": 9,
		"11": 7.2,
		"12": 11.5,
		"13": 11.1,
		"14": 15.4,
		"15": 3.4,
		"16": 12.4,
		"17": 13.5,
		"18": 9.8,
		"19": 11.8,
		"20": 11.8,
		"21": 19.8,
		"22": 11.4,
		"23": 1.5,
		"24": 4.9,
		"25": 12.9,
		"26": 4.7,
		"27": 14,
		"28": 13.4,
		"29": 8.5,
		"30": 12.4,
		"31": 10.2,
		"32": 12,
		"33": 9.9,
		"34": 5.7,
		"35": 5.8,
		"36": 12.6,
		"37": 0.6,
		"38": 14.9,
		"39": 8.8,
		"40": 12.4,
		"41": 10.1,
		"42": 7.4,
		"43": 5.4,
		"44": 4.4,
		"45": 11.2,
		"46": 14.2,
		"47": 4.3,
		"48": 11.7,
		"49": 1.1,
		"50": 16,
	}
};

// exSingleTime
const exSingleTime = {
     year: 2020,
     month: 1,
     day: 31,
     startHour: 18,
     startMin: 50,
     endHour: 19,
     endMin: 0,
	lotValues: {
		"1": 88.3,
		"2": 84.9,
		"3": 84,
		"4": 88.7,
		"5": 96.2,
		"6": 81.6,
		"7": 83.3,
		"8": 87.8,
		"9": 86.8,
		"10": 91.4,
		"11": 80.7,
		"12": 93,
		"13": 94.5,
		"14": 80.8,
		"15": 83.3,
		"16": 97.1,
		"17": 83.4,
		"18": 81.8,
		"19": 90.1,
		"20": 80.2,
		"21": 90.3,
		"22": 93,
		"23": 87,
		"24": 99.1,
		"25": 93.2,
		"26": 84.9,
		"27": 80.9,
		"28": 92.7,
		"29": 81.3,
		"30": 89.2,
		"31": 71.2,
		"32": 74.6,
		"33": 78.3,
		"34": 71.5,
		"35": 76.7,
		"36": 75.6,
		"37": 70.4,
		"38": 60.1,
		"39": 76.6,
		"40": 79.6,
		"41": 74.7,
		"42": 79.9,
		"43": 97.9,
		"44": 92.9,
		"45": 99.8,
		"46": 97,
		"47": 82.5,
		"48": 80.6,
		"49": 98.5,
		"50": 96.2,
	}
};

// ================================================================================================================================

// Analytics View - Dashboard Examples


module.exports = {
	demoLotGraph,
	demoLotOccupancyOptions,
	lotOccupancyGraph,
	lotOccupancyOptions,
	exHigherTraffic9To5,
	exBusierOnWeekdays,
	exMoralsNearDinner,
	exBusierOnValentines,
	exSingleTime,
};