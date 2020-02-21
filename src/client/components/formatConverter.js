export function parkingLotJSONToMapsFormat(placelist) {
	let locationsToMark = [];
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
	return locationsToMark;
}

export function parkingSpaceJSONToMapsFormat(placelist) {
	let locationsToMark = [];
	for (let i = 0; i < placelist.length; i++) {
	locationsToMark.push({id: placelist[i].device_id,
	                      active: placelist[i].active,
	                      geometry: {
	                        location: {
	                          lat: placelist[i].lat,
	                          lng: placelist[i].lng
	                        },
	                        rotation: placelist[i].rotation_degrees,
	                      }
	                    });
	}
	return locationsToMark;
}