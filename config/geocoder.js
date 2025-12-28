const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'openstreetmap',
  httpAdapter: 'https',
  formatter: null,
  headers: {
    'User-Agent': 'RapidResponse-App/1.0 (shivarajbirajadar@gmail.com)' // <-- Required
  }
};

module.exports = NodeGeocoder(options);
