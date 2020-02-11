import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from './Marker.jsx';

// examples:
import GoogleMap from './GoogleMap.jsx';

import SearchBox from './SearchBox.jsx';
import SideBar from "./SideBar";

// consts
const LOS_ANGELES_CENTER = [34.0522, -118.2437];

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
    };
  }

  apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);

    // Other Stuff....
    this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
    });
  };

  componentDidMount() {
    fetch('/public/places.json')
      .then(response => response.json())
      .then(data => this.setState({ places: data.results }));
  }

  addPlace = (place) => {
    console.log("addPlace", place);
    this.setState({ places: place });
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      <div id="MapsWrapper" className="fill-window">
        <SideBar pageWrapId={"page-wrap"} mapApiLoaded={mapApiLoaded} map={mapInstance} mapApi={mapApi} addplace={this.addPlace} outerContainerId={"MapsWrapper"} />
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={LOS_ANGELES_CENTER}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, places)}
          >
            {places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    );
  }
}

export default Main;
