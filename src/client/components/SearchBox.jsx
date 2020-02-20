import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px;
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    console.log("componentDidMount");
    console.log(mapApi);
    console.log(mapApi.places);
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged = ({ map, addplace } = this.props) => {
    console.log("onPlacesChanged")
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    this.searchInput.blur();
    var data = new FormData();
    var payload = JSON.stringify({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
    data.append("myjsonkey", payload);
    fetch('/api/parking/nearby', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: payload,
    }).then(res => res.json())
      .then(function(res) {
        let placelist = res.nearbyParking;
        let locationsToMark = []
        for (let i = 0; i < placelist.length; i++) {
          locationsToMark.push({id: placelist[i].lot_id,
                                name: placelist[i].name,
                                geometry: {
                                  location: {
                                    lat: placelist[i].lat,
                                    lng: placelist[i].lng
                                  }
                                }
                              });
        }
        addplace(locationsToMark);
      });
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
      <Wrapper>
        <input
          ref={(ref) => {
            this.searchInput = ref;
          }}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Enter a location"
        />
      </Wrapper>
    );
  }
}

export default SearchBox;
