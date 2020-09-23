const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f7e74700ef9c5b30b99db563a26ccf60&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      const lowLevelError = "Unable to connect to weather service!";
      callback(lowLevelError, undefined);
    } else if (response.body.error) {
      // console.log(response.body.error);

      const apiError = "Unable to find location!";
      callback(apiError, undefined);
    } else {
      const description = response.body.current.weather_descriptions[0];
      const temp = response.body.current.temperature;
      const feelsLike = response.body.current.feelslike;

      const result = `${description}. It is currently ${temp} degrees out. It feels like ${feelsLike} degrees.`;
      callback(undefined, result);
    }
  });
};

module.exports = forecast;
