const {nextISSTimesForMyLocation} = require('./iss_promised');

const print = (passTimes) => {
  for (time of passTimes) {
    const day = new Date(time['risetime'] * 1000).toLocaleString("en-GB");
    console.log(day);
    console.log(`Next pass at ${day} (PST) for ${time.duration} seconds`);
  }
};
nextISSTimesForMyLocation()
  .then(print)
  .catch((error) => {
    console.log("ERROR: ", error.message);
  });