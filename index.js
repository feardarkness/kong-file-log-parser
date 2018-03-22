const fs = require('fs');
const byline = require('byline');

const stream = byline(fs.createReadStream('./log-kong.log', { encoding: 'utf8' }));

const gruposPorIp = {};
const gruposPorUrl = {};
const gruposPorConsumer = {};

function agruparPorIp(ip) {
  if (gruposPorIp.hasOwnProperty(ip)) {
    gruposPorIp[ip] = gruposPorIp[ip] + 1;
  } else {
    gruposPorIp[ip] = 1;
  }
}

function agruparPorConsumer(consumer) {
  if (gruposPorConsumer.hasOwnProperty(consumer)) {
    gruposPorConsumer[consumer] = gruposPorConsumer[consumer] + 1;
  } else {
    gruposPorConsumer[consumer] = 1;
  }
}

function agruparPorUrl(url) {
  if (gruposPorUrl.hasOwnProperty(url)) {
    gruposPorUrl[url] = gruposPorUrl[url] + 1;
  } else {
    gruposPorUrl[url] = 1;
  }
}

stream.on('data', function(line) {
  const logEnJson = JSON.parse(line);
  if (logEnJson.api.name === 'segip') { // solo para SEGIP
    agruparPorIp(logEnJson.client_ip);
    agruparPorUrl(logEnJson.request.uri);
    agruparPorConsumer(logEnJson.consumer.username);
  }
});

stream.on('error', function(error) {
  console.log('===============================================================');
  console.log(error);
  console.log('===============================================================');
});

stream.on('finish', function(error) {
  console.log('========================== POR CONSUMER =======================');
  console.log(gruposPorConsumer);
  console.log('===============================================================');

  console.log('========================== POR URL =======================');
  console.log(gruposPorUrl);
  console.log('===============================================================');

  console.log('========================== POR IP =======================');
  console.log(gruposPorIp);
  console.log('===============================================================');
});