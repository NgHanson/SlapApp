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
    // console.log("componentDidMount");
    // console.log(mapApi);
    // console.log(mapApi.places);
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged = ({ map, addplace, updateMapCenter } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;
    this.searchInput.blur();
    updateMapCenter(place.geometry.location.lat(), place.geometry.location.lng());
    // searchForNearbyParking(place.geometry.location.lat(), place.geometry.location.lng())
    //   .then(function(res) {
    //     const placelist = parkingLotJSONToMapsFormat(res.nearbyParking);
    //     addplace(placelist);
    //   });
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
