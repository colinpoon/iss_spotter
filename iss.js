 const request = require('request');

 const fetchMyIP = function(cb) {
   request('https://api64.ipify.org/?format=json', (err, res, body) => {
     if (err) {
       cb(err, null);
       return;
     }
     if (res.statusCode !== 200) {
      cb(Error(`Status Code ${res.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
     return cb(null, JSON.parse(body).ip);
   });
 };
  
 const fetchCoordsByIP = function(ip, cb) {
   request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
     if (err) {
       cb(err, null);
       return;
     }
     if (res.statusCode !== 200) {
      cb(Error(`Status Code ${res.statusCode} when fetching Coordinates for IP: ${body}`), null);
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
   request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`,  (err, res, body) => {
     if (err) {
       cb(err, null);
       return;
     }
     if (res.statusCode !== 200) {
      cb(Error(`Status Code ${res.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
     cb(null, JSON.parse(body).response)
   })
 }
 
 module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };