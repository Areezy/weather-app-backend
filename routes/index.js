var express = require("express");
var router = express.Router();
const axios = require("axios");
require("dotenv").config();


router.get("/weather", function (req, res) {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let unit = req.query.unit;

  let API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${process.env.WEATHER_API_KEY}&units=${unit}`;

  axios
    .get(API_URL)
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
      res.status(401).send("Error from server");
    });
});

router.get("/reversegeocode", function (req, res) {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let locationData = {};

  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    )
    .then(function (response) {
      locationData = {
        city: response.data[0].local_names.en,
        country: response.data[0].country,
      };
      res.setHeader("Content-Type", "application/json");

      res.status(200).send(JSON.stringify(locationData));
    })
    .catch(function (error) {
      console.log(error.message);
      res.status(400).send("Error from server");
    });
});

router.get("/geocode", function (req, res) {
  let location = req.query.location;
  let locationData = {};

  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    )
    .then(function (response) {
      locationData = {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        country: response.data[0].country,
      };
      res.setHeader("Content-Type", "application/json");

      res.status(200).send(JSON.stringify(locationData));
    })
    .catch(function (error) {
      console.log(error.message);
      res.status(400).send("Error from server");
    });
});

module.exports = router;
