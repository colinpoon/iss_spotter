const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api64.ipify.org/?format=json');
};

const fetchCoordsByIP = function(ip) {
  let ipParsed = JSON.parse(ip).ip;
  return request(`https://freegeoip.app/json/${ipParsed}`);
};

const fetchISSFlyOverTimes = (coords) => {
  let lat = JSON.parse(coords).latitude;
  let long = JSON.parse(coords).longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
};

// returns the promise

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => JSON.parse(data).response);

};
module.exports = { nextISSTimesForMyLocation };