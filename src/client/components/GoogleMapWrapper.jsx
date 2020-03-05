import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

import Marker from './Marker.jsx';
import ParkingSpace from './ParkingSpace.jsx'
import GoogleMap from './GoogleMap.jsx';
import SideBar from "./SideBar";
import AnalyticsDashboard from "./AnalyticsDashboard";

import { searchForNearbyParking, getDevicesInLot, getAnalyticsSelections } from './clientCalls.js';
import { parkingLotJSONToMapsFormat, parkingSpaceJSONToMapsFormat } from './formatConverter.js';

// consts
const WATERLOO_CENTER = [43.472393361375325, -80.53837152380368];

//Make enums....
/*
User Type
1 - User
2 - Owner

View Type
1 - General
2 - Lot
3 - Analytics
*/

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
      moveMapCenterDueToSidebar(map);
    });
  });
};

const moveMapCenterDueToSidebar = (map) => {
  // Move map center right 300px (width of hamburger menu)
  map.panBy(-300,0);
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
      lots: {},
      placeMarkerOnClick: false,
      userType: 1,
      viewType: 1,
      analyticsSelections: {},
    };
  }

  toggleUserType = () => {
    this.setState((prevState) => ({ userType: prevState.userType == 2 ? 1 : 2}));
  }

  changeViewType = (type) => {
    this.setState({viewType: type});
  }

  setAnalyticsSelections = (selections) => {
    this.setState({analyticsSelections: selections});
  }

  apiIsLoaded = (map, maps, places) => {
    let self = this
    // map.setOptions({disableDefaultUI: true});
    if (!isEmpty(places)){
      // Get bounds by our places
      const bounds = getMapBounds(map, maps, places);
      // Fit map to bounds
      map.fitBounds(bounds);
      // Bind the resize listener
      bindResizeListener(map, maps, bounds);
    }
    // Add bounds change listener for when google maps zoom changes...
    map.addListener('bounds_changed', function(event) {
      if (self.state.viewType == 2 || self.state.viewType == 3) {
          let curr_places = self.state.places
          self.addPlace([])
          self.addPlace(curr_places)
      }
    });

    // Other Stuff....
    this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
    });
  };

  componentDidMount() {
    this.setState({places: []});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("googlemapswrapper component did update");
    if (this.state.mapInstance) {
    console.log("Current Map Zoom: " + this.state.mapInstance.getZoom())  
    }
    
    const self =this;
    if (prevState.mapLat !== this.state.mapLat || prevState.mapLng !== this.state.mapLng) {
      console.log("map center changed")
      searchForNearbyParking(this.state.mapLat, this.state.mapLng)
      .then(function(res) {
        const placelist = parkingLotJSONToMapsFormat(res.nearbyParking);
        self.addPlace([]);
        self.addPlace(placelist);

        self.setLots(placelist);
      }).then(function(res) {self.fitMapToBounds();});
    }

    if (prevState.viewType !== this.state.viewType) {
      if (this.state.viewType == 1) {
        console.log("changed to viewType 1")
        searchForNearbyParking(this.state.mapLat, this.state.mapLng)
        .then(function(res) {
          const placelist = parkingLotJSONToMapsFormat(res.nearbyParking);
          self.setLots(placelist);
        })
        .then(function(res) {
          self.fitMapToBounds();
        });
      
      } else if (this.state.viewType == 2) {          
          console.log("changed to viewType 2");
          getDevicesInLot(this.state.currentLotID).then(function(res) {
            return parkingSpaceJSONToMapsFormat(res.devices);
          })
          .then(
            function(locationsToMark) {
              self.addPlace([]);
              self.addPlace(locationsToMark);
            }
          )
          .then(
            function(res) { 
              self.fitMapToBounds();
            }
          );
      } else if (this.state.viewType == 3) {
        console.log("Changed to viewType 3");
        getDevicesInLot(this.state.currentLotID).then(function(res) {
          return parkingSpaceJSONToMapsFormat(res.devices);
        })
        .then(function(locationsToMark){
          self.addPlace([]); self.addPlace(locationsToMark);
        })
        .then(function(res) { 
          self.fitMapToBounds();
        });
      }
    }
    if (this.state.analyticsSelections !== prevState.analyticsSelections) {
      getAnalyticsSelections(this.state.currentLotID, this.state.analyticsSelections).then(function(res) {
        return parkingSpaceJSONToMapsFormat(res.devices);
      }).then(function(locationsToMark){self.addPlace(locationsToMark)
      }).then(function(res) {self.fitMapToBounds();
      }).then(function(res) {console.log("done")});
    }
    if (this.props.socketDeviceData !== prevProps.socketDeviceData && (this.state.viewType == 2 || this.state.viewType == 3)) {
      console.log("SocketDeviceData updated...")
      // Places shouldn't really be an array... oh well demo is soon
      let curr_spots = this.state.places ? this.state.places : [];
      for (let i = 0; i < curr_spots.length; i++) {
        if (String(curr_spots[i].id) === String(this.props.socketDeviceData.device_id)) {
          curr_spots[i].active = this.props.socketDeviceData.active;
          curr_spots[i].occupied = this.props.socketDeviceData.occupied;
          break;
        }
      }
      this.setState({places: curr_spots})
      console.log("Updated ting... ", curr_spots)
    }
    if (this.props.socketLotData !== prevProps.socketLotData  && this.props.socketLotData !== undefined && this.state.viewType == 1) {
      console.log("socketLotData updated...")
      console.log(this.props.socketLotData)
      let curr_lots = this.state.lots;
      if (curr_lots[this.props.socketLotData.lot_id]) {
        if (String(this.props.socketLotData.lot_id) in curr_lots) {
        console.log(curr_lots[this.props.socketLotData.lot_id])
        curr_lots[this.props.socketLotData.lot_id].capacity = this.props.socketLotData.capacity;
        curr_lots[this.props.socketLotData.lot_id].freeCount = this.props.socketLotData.freeCount;    
        this.setState({lots: curr_lots});
        }
        
      }
    }
  }

  changeCurrentLot = (lot_id) => {
    this.setState({currentLotID: lot_id});
  };

  updateMapCenter = (lat, lng) => {
    this.setState({mapLat: lat, mapLng: lng});
  };

  fitMapToBounds = () => {
    const map = this.state.mapInstance;
    const maps = this.state.mapApi;
    const bounds = (this.state.viewType == 2 || this.state.viewType == 3) ? getMapBounds(map, maps, this.state.places) : getMapBounds(map, maps, Object.entries(this.state.lots).map(([k, v]) => {return v}))
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
    if (this.state.viewType == 2 || this.state.viewType == 3) {
      map.setOptions({gestureHandling: "none"});
    } else {
      map.setOptions({gestureHandling: "auto"});
    }
    moveMapCenterDueToSidebar(map);
  };

  setLots = (lots) => {
    let lotMap = {};
    lots.forEach(l => {
      lotMap[l.id] = l;
    });
    this.setState({ lots: lotMap });
  }

  addPlace = (place) => {
    this.setState({ places: place });
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
      places, lots, mapApiLoaded, mapInstance, mapApi, userType, viewType
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
        />
        
        <div style={{width: '100%', height: (viewType == 3 ? '90%' : '100%')}}>
          <GoogleMap
            defaultZoom={10}
            defaultCenter={WATERLOO_CENTER}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, places)}
            onClick={this._onClick}
            onZoomChanged={this.onZoomChanged}
          >
            {/* Place Components on the map from json file */}
            {(viewType == 2 || viewType == 3) && places.map((place) => {
              // Note: https://stackoverflow.com/questions/41070083/wrong-location-of-marker-when-rendered-in-component
                return <ParkingSpace 
                  mapApi={mapApi}
                  mapInstance={mapInstance}
                  viewType={viewType}
                  key={place.id}
                  place={place}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}/>
            })}
            {(viewType === 1) && Object.entries(lots).map(([id, lot]) => {
                return <Marker
                  key={lot.id}
                  lot_id={lot.id}
                  text={lot.name}
                  lat={lot.geometry.location.lat}
                  lng={lot.geometry.location.lng}
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
