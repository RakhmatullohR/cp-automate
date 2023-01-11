// node modules

var express = require('express');
var router = express.Router();
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const getUrlPathname = require('../functions/getUrlPathname');
const allData = require('../mocks/allData');
const {
  userAgentString,
  options,
  dashboardUrl,
  dashboardEmail,
  dashboardPassword,
  timeInterval,
  password,
} = require('../mocks/variables');
// local
const getPhillips = require('../puppeteer/phillips');
// midlweare
puppeteer.use(StealthPlugin());

const downloadPath = path.resolve('./download/websiteData');

const req1 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://pct.phillips-connect.com',
  websiteEmail: 'equipment@borderlandersinc.com',
  websitePassword: password?.pwd301,
  pathname: '/phillips/first',
};
//!-1 get equipments.
// 301
router.post('/phillips/first', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 301);
  const leaserName = allData[objIndex].leaserName;
  const companyName = allData[objIndex].companyName;
  const websiteEmail = allData[objIndex].email;

  try {
    const dashboardUrl = `${req1.dashboardUrl}/api/auth/login`;
    const dashboardEmail = req1.dashboardEmail;
    const dashboardPassword = req1.dashboardPassword;
    const websiteUrl = req1.websiteUrl;
    const websitePassword = req1.websitePassword;
    const databaseUrl = `${req1.dashboardUrl}${getUrlPathname(
      req1.websiteUrl
    )}`;

    const props = {
      name: 'phillips/first',
      dashboardUrl,
      dashboardEmail,
      dashboardPassword,
      websiteUrl,
      websiteEmail,
      websitePassword,
      databaseUrl,
      leaserName,
      companyName,

      options,
      userAgentString,
      downloadPath,
    };
    let result = await getPhillips(props);

    if (result?.success === true) {
      output = {
        id: 301,
        api: 'api/300/phillips/first',
        email: websiteEmail,
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 301,
        api: 'api/300/phillips/first',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 301,
      api: 'api/300/phillips/first',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }

  allData[objIndex].status = output.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output.success;
  allData[objIndex].message = output.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].websiteUrl = req1.websiteUrl;
  allData[objIndex].email = websiteEmail;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});
const req2 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://pct.phillips-connect.com',
  websiteEmail: 'trailers@cargoprimecorp.com',
  websitePassword: password?.pwd302,
  pathname: '/phillips/second',
};

router.post('/phillips/second', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 302);
  const leaserName = allData[objIndex].leaserName;
  const companyName = allData[objIndex].companyName;
  const websiteEmail = allData[objIndex].email;

  try {
    const dashboardUrl = `${req2.dashboardUrl}/api/auth/login`;
    const dashboardEmail = req2.dashboardEmail;
    const dashboardPassword = req2.dashboardPassword;
    const websiteUrl = req2.websiteUrl;
    const websitePassword = req2.websitePassword;
    const databaseUrl = `${req2.dashboardUrl}${getUrlPathname(
      req2.websiteUrl
    )}`;

    const props = {
      name: 'phillips/second',
      dashboardUrl,
      dashboardEmail,
      dashboardPassword,
      websiteUrl,
      websiteEmail,
      websitePassword,
      databaseUrl,
      leaserName,
      companyName,

      options,
      userAgentString,
      downloadPath,
    };
    let result = await getPhillips(props);

    if (result?.success === true) {
      output = {
        id: 302,
        api: 'api/300/phillips/second',
        email: websiteEmail,
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 302,
        api: 'api/300/phillips/second',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 302,
      api: 'api/300/phillips/second',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }

  allData[objIndex].status = output.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output.success;
  allData[objIndex].message = output.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].email = websiteEmail;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});
module.exports = router;
