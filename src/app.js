const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars (node module to create dynamic templates) and views location (default: "views") for express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve (everything inside the public folder is made available by the server)
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Christoph Windpassinger',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Christoph Windpassinger',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Trying to help you...',
    title: 'Help',
    name: 'Christoph Windpassinger',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    //return to make sure that responses below are not sent
    return res.send({
      error: 'You have to provide an address!',
    });
  }

  geoCode(req.query.address, (error, geoData) => {
    if (error) {
      return res.send({ error });
    }

    forecast(geoData.longitude, geoData.latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location: geoData.location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    //return to make sure that responses below are not sent
    return res.send({
      error: 'Provide a search term',
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found.',
    name: 'Christoph Windpassinger',
  });
});

//* in express means: match anything that hasn't been matched so far
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Christoph Windpassinger',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
