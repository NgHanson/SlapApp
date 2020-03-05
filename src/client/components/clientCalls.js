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
 return fetch('/api/parking/analyticsrange', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
 }).then(function(res) {return res.json();});
}

export function getManagedLots() {
  return fetch('/api/parking/all').then(res => res.json()).then(json => json["parkingAreas"]);
}

export function getSavedLots() {
  return fetch('/api/parking/all').then(res => res.json()).then(json => json["parkingAreas"]);
}