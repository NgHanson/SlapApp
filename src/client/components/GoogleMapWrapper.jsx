import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

import Marker from './Marker.jsx';
import ParkingSpace from './ParkingSpace.jsx'
import GoogleMap from './GoogleMap.jsx';
import SideBar from "./SideBar";
import AnalyticsDashboard from "./AnalyticsDashboard";

import { searchForNearbyParking, getDevicesInLot, getAnalyticsSelections, getManagedLots, getSavedLots } from './clientCalls.js';
import { arrayToObj, objValsList } from './formatConverter.js';
import { getMapBounds, bindResizeListener, moveMapCenterDueToSidebar } from './mapUtils.js';

// consts
const WATERLOO_CENTER = [43.472393361375325, -80.53837152380368];

//Make enums....
/*
User Type
1 - User
2 - Owner

View Type
0 - Initial View (App Start)
1 - General
2 - Lot
3 - Analytics
*/

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      parkingSpaces: [],
      lots: {},
      managedLots: {},
      savedLots: {},
      placeMarkerOnClick: false,
      userType: 1,
      viewType: 1,
      analyticsSelections: {},
    };
  }

  apiIsLoaded(map, maps, places) {
    const self = this;
    // Add bounds change listener for when google maps zoom changes...
    map.addListener('bounds_changed', function(event) {
      if (self.state.viewType == 2 || self.state.viewType == 3) {
          let curr_places = self.state.parkingSpaces;
          self.setState({parkingSpaces: curr_places});
      }
    });

    // Other Stuff....
    this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
    });
  }

  componentDidMount() {
    const self = this;
    getManagedLots().then(function(res) {self.setState({managedLots: arrayToObj(res, 'lot_id')});});
    getSavedLots().then(function(res) {self.setState({savedLots: arrayToObj(res, 'lot_id')});});
  }

  componentDidUpdate(prevProps, prevState) {
    const self = this;
    // Some sort of search
    if (prevState.mapLat !== this.state.mapLat || prevState.mapLng !== this.state.mapLng) {
      console.log("map center changed")
      searchForNearbyParking(this.state.mapLat, this.state.mapLng)
      .then(function(res) {
        const placelist = arrayToObj(res.nearbyParking, 'lot_id');
        console.log("placelist: ", placelist)
        self.setState({lots: placelist})
        return res.nearbyParking;
      }).then(function(res) {self.fitMapToBounds();});
    }
    // ViewType updates
    if (prevState.viewType !== this.state.viewType) {
      if (this.state.viewType == 1) {
        console.log("changed to viewType 1")
        searchForNearbyParking(this.state.mapLat, this.state.mapLng)
        .then(function(res) {
          const placelist = arrayToObj(res.nearbyParking, 'lot_id');
          self.setState({lots: placelist});
        }).then(function(res) {self.fitMapToBounds();});
      } else if (this.state.viewType == 2) {          
          console.log("changed to viewType 2");
          getDevicesInLot(this.state.currentLotID).then(function(res) {
            const spacelist = arrayToObj(res.devices, 'device_id');
            self.setState({parkingSpaces: spacelist});
          }).then(function(res) { self.fitMapToBounds();});
      } else if (this.state.viewType == 3) {
        console.log("Changed to viewType 3");
        getDevicesInLot(this.state.currentLotID).then(function(res) {
          const spacelist = arrayToObj(res.devices, 'device_id');
          self.setState({parkingSpaces: spacelist});
        }).then(function(res) { self.fitMapToBounds();});
      }
    }
    // Analytics Updates
    if (this.state.analyticsSelections !== prevState.analyticsSelections) {
      getAnalyticsSelections(this.state.currentLotID, this.state.analyticsSelections).then(function(res) {
        const spacelist = arrayToObj(res.devices, 'device_id');
        self.setState({parkingSpaces: spacelist});
      }).then(function(res) {self.fitMapToBounds();});
    }
    // TODO: NEED TO UPDATE SAVED AND MANAGED LOTS IN THE SAME WAY!! ===========================================================================
    // Web Socket Updates - Parking Spaces
    if (this.props.socketDeviceData !== prevProps.socketDeviceData && (this.state.viewType == 2 || this.state.viewType == 3)) {
      console.log("SocketDeviceData updated...")
      let curr_spots = this.state.parkingSpaces;
      if (curr_spots[this.props.socketDeviceData.device_id]) {
        curr_spots[this.props.socketDeviceData.device_id].active = this.props.socketDeviceData.active;
        curr_spots[this.props.socketDeviceData.device_id].occupied = this.props.socketDeviceData.occupied;
        this.setState({parkingSpaces: curr_spots})
      }
    }
    // Web Socket Updates - Parking Lots
    if (this.props.socketLotData !== prevProps.socketLotData  && this.props.socketLotData !== undefined && this.state.viewType == 1) {
      console.log("socketLotData updated...");
      let curr_lots = this.state.lots;
      if (curr_lots[this.props.socketLotData.lot_id]) {
        if (String(this.props.socketLotData.lot_id) in curr_lots) {
          curr_lots[this.props.socketLotData.lot_id].capacity = this.props.socketLotData.capacity;
          curr_lots[this.props.socketLotData.lot_id].freeCount = this.props.socketLotData.freeCount;    
          this.setState({lots: curr_lots});
        }
      }
    }
  }

  toggleUserType = () => {
    this.setState((prevState) => ({ userType: prevState.userType == 2 ? 1 : 2}));
  };

  changeViewType = (type) => {
    this.setState({viewType: type});
  };

  setAnalyticsSelections = (selections) => {
    this.setState({analyticsSelections: selections});
  };

  changeCurrentLot = (lot_id) => {
    this.setState({currentLotID: lot_id});
  };

  updateMapCenter = (lat, lng) => {
    this.setState({mapLat: lat, mapLng: lng});
  };

  fitMapToBounds = () => {
    const map = this.state.mapInstance;
    const maps = this.state.mapApi;
    const currPlaces = (this.state.viewType == 2 || this.state.viewType == 3) ? this.state.parkingSpaces : this.state.lots;
    const bounds = getMapBounds(map, maps, objValsList(currPlaces));
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
    if (this.state.viewType == 2 || this.state.viewType == 3) {
      map.setOptions({gestureHandling: "none"});
    } else {
      map.setOptions({gestureHandling: "auto"});
    }
    moveMapCenterDueToSidebar(map);
  };

  addPlace = (place) => {
    this.setState({ parkingSpaces: place });
  };

  // https://github.com/google-map-react/google-map-react/blob/master/API.md#onclick-func
  _onClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event);
    this.setState({
      clickX: x,
      clickY: y,
      clickLat: lat,
      clickLng: lng,
      placeMarkerOnClick: true
    });
  };

  onZoomChanged = () => {
    console.log("zoom changed")
  };

  render() {
    const {
      parkingSpaces, lots, mapApiLoaded, mapInstance, mapApi, userType, viewType
    } = this.state;

    return (
      <div id="MapsWrapper" className="fill-window" style={{overflowY: (viewType == 3 ? 'scroll' : '')}}>
        {/* Hamburger Menu Sidebar */}
        <SideBar 
          isOpen={true}
          pageWrapId={"page-wrap"}
          mapApiLoaded={mapApiLoaded}
          map={mapInstance}
          mapApi={mapApi}
          addplace={this.addPlace}
          outerContainerId={"MapsWrapper"}
          userTypeToggle={this.toggleUserType}
          changeViewType={this.changeViewType}
          updateMapCenter={this.updateMapCenter}
          userType={userType}
          viewType={viewType}
          changeCurrentLot={this.changeCurrentLot}
          setAnalyticsSelections={this.setAnalyticsSelections}
          lotInfo={this.state.lots[this.state.currentLotID]}
          lots={this.state.lots}
          socketLotData={this.props.socketLotData}
          currentLotID={this.state.currentLotID}
          managedLots={this.state.managedLots}
          savedLots={this.state.savedLots}
        />
        
        <div style={{width: '100%', height: (viewType == 3 ? '90%' : '100%')}}>
          <GoogleMap
            defaultZoom={10}
            defaultCenter={WATERLOO_CENTER}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, parkingSpaces)}
            onClick={this._onClick}
            onZoomChanged={this.onZoomChanged}
          >
            {/* Place Components on the map from json file */}
            {(viewType == 2 || viewType == 3) && Object.entries(parkingSpaces).map(([id, place]) => {
              // Note: https://stackoverflow.com/questions/41070083/wrong-location-of-marker-when-rendered-in-component
                return <ParkingSpace 
                  mapApi={mapApi}
                  mapInstance={mapInstance}
                  viewType={viewType}
                  key={place.device_id}
                  place={place}
                  lat={place.lat}
                  lng={place.lng}/>
            })}
            {(viewType === 1) && Object.entries(lots).map(([id, lot]) => {
                return <Marker
                  key={lot.lot_id}
                  lot_id={lot.lot_id}
                  text={lot.name}
                  lat={lot.lat}
                  lng={lot.lng}
                  changeViewType={this.changeViewType}
                  userType={userType}
                  viewType={viewType}
                  changeCurrentLot={this.changeCurrentLot}
                  capacity={lot.capacity}
                  freeCount={lot.freeCount}
                />
            })}

            {/* Place Component on map click */}
            {/*placeMarkerOnClick && <ParkingSpace place={{geometry: {rotation: 63.23308549}}} key={"clickMarker"} text="New Marker" lat={this.state.clickLat} lng={this.state.clickLng}/>*/}
          </GoogleMap>
        </div>
        {viewType == 3 && <AnalyticsDashboard/>}
      </div>
    );
  }
}

export default Main;
