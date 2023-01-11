require('dotenv').config();
// puppeteer variables
const userAgentString =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
const options = {
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: false,

  slowMo: 100,
  args: [
    // '--auto-open-devtools-for-tabs',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--disable-gpu',
    '--enable-webgl',
    '--window-size=1200,800',
  ],
};
const dashboardUrl = process.env.DASHBOARD_BASE_URL;
const dashboardEmail = process.env.DASHBOARD_EMAIL;
const dashboardPassword = process.env.DASHBOARD_PASSWORD;
const timeInterval = 1500000;
const password = {
  pwd101: process.env.PASSWORD_101,
  pwd102: process.env.PASSWORD_102,
  pwd103: process.env.PASSWORD_103,
  pwd104: process.env.PASSWORD_104,
  pwd105: process.env.PASSWORD_105,
  pwd106: process.env.PASSWORD_106,
  pwd201: process.env.PASSWORD_201,
  pwd202: process.env.PASSWORD_202,
  pwd301: process.env.PASSWORD_301,
  pwd302: process.env.PASSWORD_302,
  pwd401: process.env.PASSWORD_401,
  pwd501: process.env.PASSWORD_501,
  pwd601: process.env.PASSWORD_601,
};
module.exports = {
  userAgentString,
  options,
  dashboardUrl,
  dashboardEmail,
  dashboardPassword,
  timeInterval,
  password,
};
