// Usage: searchForNearbyParking(place).then(function(json) {console.log(json)})
export function searchForNearbyParking(lat, lng) {
  var data = new FormData();
  var payload = JSON.stringify({lat: lat, lng: lng});
  data.append("myjsonkey", payload);
  return fetch('/api/parking/nearby', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: payload,
    }).then(function(res) {return res.json();});
}

export function getDevicesInLot(lot_id) {
  const query_string = '/api/devices/fromlot/'+lot_id;
  return fetch(query_string).then(function(res) {return res.json();});
}

export function getAnalyticsSelections(currentLotID, analyticsSelections) {
 var payload = JSON.stringify({lot_id: currentLotID, analyticsSelections: analyticsSelections});
 return fetch('/api/parking/analytics', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
 }).then(function(res) {return res.json();});
}