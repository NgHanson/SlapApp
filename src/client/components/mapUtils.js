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

module.exports = {
  getMapBounds,
  bindResizeListener,
  moveMapCenterDueToSidebar,
};
