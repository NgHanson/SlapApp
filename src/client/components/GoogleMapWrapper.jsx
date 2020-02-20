import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

import Marker from './Marker.jsx';
import ParkingSpace from './ParkingSpace.jsx'
import GoogleMap from './GoogleMap.jsx';
import SideBar from "./SideBar";

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
    });
  });
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
      placeMarkerOnClick: false,
      userType: 1,
      viewType: 1,
    };
  }

  toggleUserType = () => {
    this.setState((prevState) => ({ userType: prevState.userType == 2 ? 1 : 2}));
  }

  changeViewType = (type) => {
    this.setState({viewType: type});
  }

  apiIsLoaded = (map, maps, places) => {
    if (!isEmpty(places)){
      // Get bounds by our places
      const bounds = getMapBounds(map, maps, places);
      // Fit map to bounds
      map.fitBounds(bounds);
      // Bind the resize listener
      bindResizeListener(map, maps, bounds);
    }
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

  addPlace = (place) => {
    console.log("googlemapwrapper addPlace", place);
    const map = this.state.mapInstance;
    const maps = this.state.mapApi
    this.setState({ places: place });
    const bounds = getMapBounds(map, maps, this.state.places);
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
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

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi, placeMarkerOnClick, userType, viewType
    } = this.state;
    return (
      <div id="MapsWrapper" className="fill-window">
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
          userType={userType}
          viewType={viewType}
        />
        
        {/* Google Map */}
          <GoogleMap
            defaultZoom={10}
            defaultCenter={WATERLOO_CENTER}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, places)}
            onClick={this._onClick}
          >
            {/* Place Components on the map from json file */}
            {places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                changeViewType={this.changeViewType}
                userType={userType}
                viewType={viewType}
              />
            ))}

            {/* Place Component on map click */}
            {placeMarkerOnClick && <ParkingSpace key={"clickMarker"} text="New Marker" lat={this.state.clickLat} lng={this.state.clickLng}/>}
          </GoogleMap>
      </div>
    );
  }
}

export default Main;
