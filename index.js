const fs = require('fs');
const byline = require('byline');
const program = require('commander');

program
  .version('0.1.0')
  .option('-f, --file [log-path]', 'Log path')
  .parse(process.argv);

let archivoLog = program.file || './partial-kong.log';
const GROUPS_BY_CONSUMER_FILENAME = './visualize/js/groups-by-CONSUMER.js';
const GROUPS_BY_HOUR_FILENAME = './visualize/js/groups-by-hour.js';

try {
  fs.unlinkSync(GROUPS_BY_CONSUMER_FILENAME);
} catch(err){}

try {
fs.unlinkSync(GROUPS_BY_HOUR_FILENAME);
} catch(err){}


const stream = byline(fs.createReadStream(archivoLog, { encoding: 'utf8' }));

const groups = {};
const groupsByHour = {};

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
    groups[year][month][consumer] = 1;
  }
}

function groupByHour({ hour, month, year, service, consumer }) {
  if (!groupsByHour.hasOwnProperty(year)) {
    groupsByHour[year] = {};
  }
  if (!groupsByHour[year].hasOwnProperty(month)) {
    groupsByHour[year][month] = {};
  }
  if (!groupsByHour[year][month].hasOwnProperty(hour)) {
    groupsByHour[year][month][hour] = {};
  }
  if (groupsByHour[year][month][hour].hasOwnProperty(consumer)) {
    groupsByHour[year][month][hour][consumer]++;
  } else {
    groupsByHour[year][month][hour][consumer] = 1;
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
    groupByHour({
      year: logDate.getFullYear(),
      hour: logDate.getHours(),
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
  console.log('+++++++++++++++++++++++++++++++++++++++++++');
  console.error(error);
});

stream.on('finish', function(error) {
  fs.writeFile(GROUPS_BY_CONSUMER_FILENAME, `const data = ${JSON.stringify(groups, null, 2)}`, 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile(GROUPS_BY_HOUR_FILENAME, `const data = ${JSON.stringify(groupsByHour, null, 2)}`, 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
});