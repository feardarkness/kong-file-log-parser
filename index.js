const fs = require('fs');
const byline = require('byline');

const archivoLog = './partial-kong.log';
const stream = byline(fs.createReadStream(archivoLog, { encoding: 'utf8' }));
try {
  fs.unlinkSync('./visualize/js/groups.js');
} catch(err){}

const groups = {};

function group({ year, month , consumer, service }) {
  if (!groups.hasOwnProperty(year)) {
    groups[year] = {};
  }
  if (!groups[year].hasOwnProperty(month)) {
    groups[year][month] = {};
  }
  if (groups[year][month].hasOwnProperty(consumer)) {
    groups[year][month][consumer]++;
  } else {
    groups[year][month][consumer] = 0;
  }
}

stream.on('data', function(line) {
  let logEnJson;
  try {
    logEnJson = JSON.parse(line);
    const logDate = new Date(logEnJson.started_at);
    group({
      year: logDate.getFullYear(),
      month: logDate.getMonth(),
      consumer: logEnJson.consumer.username,
      service: logEnJson.api.name,
    });
  } catch(err) {
    console.error(err);
    console.log('Unable to parse line', line);
  }
});

stream.on('error', function(error) {
  console.log('===============================================================');
  console.log(error);
  console.log('===============================================================');
});

stream.on('finish', function(error) {
  fs.writeFile('./visualize/js/groups.js', `const data = ${JSON.stringify(groups, null, 2)}`, 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
});