require('dotenv').config();
const starLease = `https://portal.starleasing.com`; // for getting .env data
const philips = `https://pct.phillips-connect.com`; // for getting .env data
const skybitz = `https://insight.skybitz.com`; // for getting .env data
const amsLogistics = 'https://www.amazonlogistics.com';
const relay = 'https://relay.amazon.com';
function getUrlPathname(name) {
  if (name === starLease) {
    return '/api/trailer_states/save-starLease-file-aws';
  } else if (name === philips) {
    return '/api/trailer_states/save-service-file-aws';
  }else if (name === skybitz) {
    return '/api/trailer_states/save-skyBitz-file-aws';
  }else if (name === amsLogistics) {
    return '/api/file/upload-yard-management-aws';
  } else {
    return '/api/loads/save-relay-file-aws';
  }
}
module.exports = getUrlPathname;

