const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('ERROR...' , error);
    return;
  }

  console.log('Returned IP:' , ip);
});

fetchCoordsByIP('str', (err, data) => {
  if (err) {
    console.log('ERROR...', err);
    return;
  }
  console.log('Returned coordinates:', data);
});

fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (err, data) => {
  if (err) {
    console.log('ERROR...', err);
    return;
  }
  console.log('Returned durations & rise times:', data);
});