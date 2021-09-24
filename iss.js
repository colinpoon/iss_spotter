const request = require('request');

const nextISSTimesForMyLocation = function (cb) {
  fetchMyIP((error, ip) => {
    if (error) {
      return cb(err, null);
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return cb(err, null);
      }
      fetchISSFlyOverTimes(coords, (err, pass) => {
        if (err) {
          return cb(err, null);
        }
        cb(null, pass)
      });
    });
  });
};

const fetchMyIP = function(cb) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return cb(error, null);

    if (response.statusCode !== 200) {
      cb(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    cb(null, ip);
  });
};

const fetchCoordsByIP = function(ip, cb) {
  request('https://api64.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb(error(msg), null);
      return;
    }

    const output = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };
    cb(null, output);
  });
};

const fetchISSFlyOverTimes = function(coords, cb) {
  const lat = coords.latitude;
  const long = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`, (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb(error(msg), null);
      return;
    }
    const output = JSON.parse(body).response;
    cb(null, output);
  });
};

module.exports = { nextISSTimesForMyLocation };