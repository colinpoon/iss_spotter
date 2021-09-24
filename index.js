const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const nextISSTimesForMyLocation = function(cb) {
 fetchMyIP((error, ip) => {
   if (error) {
    return cb(error, null);
   }
   fetchCoordsByIP(ip, (err, data) => {
    if (err) {
      return cb(error, null);
    }
    fetchISSFlyOverTimes(data, (err, data) => {
      if (err) {
        return cb(error, null);
      }
      return cb(null, data);
    });
  })
 })
}

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});