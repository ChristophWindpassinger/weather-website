const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2hyaXN0b3Bod2luZHBhc3NpbmdlciIsImEiOiJja2V2ZmhyNXUwb2FhMnNtZXJ4dzNkcm45In0.cmCGHz1RUKRntT-km09qJA&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      const lowLevelError = "Unable to connect to geo location services!";
      callback(lowLevelError, undefined);
    } else if (response.body.features.length === 0) {
      const apiError = "Unable to find location!";
      callback(apiError, undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};


module.exports = geoCode;