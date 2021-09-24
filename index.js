const { nextISSTimesForMyLocation } = require('./iss');

// const nextISSTimesForMyLocation = function (cb) {
//   fetchMyIP((error, ip) => {
//     if (error) {
//       return cb(err, null);
//     }
//     fetchCoordsByIP(ip, (err, coords) => {
//       if (err) {
//         return cb(err, null);
//       }
//       fetchISSFlyOverTimes(coords, (err, pass) => {
//         if (err) {
//           return cb(err, null);
//         }
//         cb(null, pass)
//       });
//     });
//   });
// };

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    return console.log("It didn't work!", err);
  }
  // success, print out the deets!
  for(time of passTimes) {
    const day = new Date(time['risetime'] * 1000).toLocaleString("en-US");
    console.log(`Next pass at ${day} (Pacific Daylight Time) for ${time.duration} seconds!`);
  }
});



// const printPassTimes = function(passTimes) {
//   for (const pass of passTimes) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   printPassTimes(passTimes);
// });



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('ERROR...' , error);
//     return;
//   }

//   console.log('Returned IP:' , ip);
// });

// fetchCoordsByIP('str', (err, data) => {
//   if (err) {
//     console.log('ERROR...', err);
//     return;
//   }
//   console.log('Returned coordinates:', data);
// });

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (err, data) => {
//   if (err) {
//     console.log('ERROR...', err);
//     return;
//   }
//   console.log('Returned fly over times:', data);
// });