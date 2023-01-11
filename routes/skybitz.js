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
const getSkybitz = require('../puppeteer/skybitz');
// midlweare
puppeteer.use(StealthPlugin());

const downloadPath = path.resolve('./download/websiteData');
const req1 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://insight.skybitz.com',
  websiteEmail: 'SL-CARGOPRIME',
  websitePassword: password?.pwd101,
  pathname: '/skybitz/first',
};
//!-1 get equipments.
router.post('/skybitz/first', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 101);
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
      name: 'skybitz/first',
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
    let result = await getSkybitz(props);

    if (result?.success === true) {
      output = {
        id: 101,
        api: 'api/100/skybitz/first',
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 101,
        api: 'api/100/skybitz/first',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 101,
      api: 'api/100/skybitz/first',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }
  allData[objIndex].email = websiteEmail;
  allData[objIndex].status = output?.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output?.success;
  allData[objIndex].message = output?.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].timeInterval = timeInterval;
  console.log(output, 'output');
  return await res.json(output);
});

const req2 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://insight.skybitz.com',
  websiteEmail: 'jmadumarov',
  websitePassword: password?.pwd102,
  pathname: '/skybitz/second',
};
//!-2 get equipments.
router.post('/skybitz/second', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 102);
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
      name: 'skybitz/second',
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
    let result = await getSkybitz(props);

    if (result?.success === true) {
      output = {
        id: 102,
        api: 'api/100/skybitz/second',
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 102,
        api: 'api/100/skybitz/second',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 102,
      api: 'api/100/skybitz/second',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }
  allData[objIndex].email = websiteEmail;
  allData[objIndex].status = output?.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output?.success;
  allData[objIndex].message = output?.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});

const req3 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://insight.skybitz.com',
  websiteEmail: 'jmadumarov',
  websitePassword: password?.pwd103,
  pathname: '/skybitz/third',
};
//!-1 get equipments.
router.post('/skybitz/third', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 103);
  const leaserName = allData[objIndex].leaserName;
  const companyName = allData[objIndex].companyName;
  const websiteEmail = allData[objIndex].email;

  try {
    const dashboardUrl = `${req3.dashboardUrl}/api/auth/login`;
    const dashboardEmail = req3.dashboardEmail;
    const dashboardPassword = req3.dashboardPassword;
    const websiteUrl = req3.websiteUrl;
    const websitePassword = req3.websitePassword;
    const databaseUrl = `${req3.dashboardUrl}${getUrlPathname(
      req3.websiteUrl
    )}`;

    const props = {
      name: 'skybitz/third',
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
    let result = await getSkybitz(props);

    if (result?.success === true) {
      output = {
        id: 103,
        api: 'api/100/skybitz/third',
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 103,
        api: 'api/100/skybitz/third',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 103,
      api: 'api/100/skybitz/third',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }
  allData[objIndex].email = websiteEmail;
  allData[objIndex].status = output?.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output?.success;
  allData[objIndex].message = output?.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});

const req4 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://insight.skybitz.com',
  websiteEmail: 'jmadumarov',
  websitePassword: password?.pwd104,
  pathname: '/skybitz/fourth',
};
//!-1 get equipments.
router.post('/skybitz/fourth', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 104);
  const leaserName = allData[objIndex].leaserName;
  const companyName = allData[objIndex].companyName;
  const websiteEmail = allData[objIndex].email;

  try {
    const dashboardUrl = `${req4.dashboardUrl}/api/auth/login`;
    const dashboardEmail = req4.dashboardEmail;
    const dashboardPassword = req4.dashboardPassword;
    const websiteUrl = req4.websiteUrl;
    const websitePassword = req4.websitePassword;
    const databaseUrl = `${req4.dashboardUrl}${getUrlPathname(
      req4.websiteUrl
    )}`;

    const props = {
      name: 'skybitz/fourth',
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
    let result = await getSkybitz(props);

    if (result?.success === true) {
      output = {
        id: 104,
        api: 'api/100/skybitz/fourth',
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 104,
        api: 'api/100/skybitz/fourth',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 104,
      api: 'api/100/skybitz/fourth',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }
  allData[objIndex].email = websiteEmail;
  allData[objIndex].status = output?.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output?.success;
  allData[objIndex].message = output?.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});

const req5 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://insight.skybitz.com',
  websiteEmail: 'jmadumarov',
  websitePassword: password?.pwd105,
  pathname: '/skybitz/fifth',
};
//!-1 get equipments.
router.post('/skybitz/fifth', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 105);

  const leaserName = allData[objIndex].leaserName;
  const companyName = allData[objIndex].companyName;
  const websiteEmail = allData[objIndex].email;

  try {
    const dashboardUrl = `${req5.dashboardUrl}/api/auth/login`;
    const dashboardEmail = req5.dashboardEmail;
    const dashboardPassword = req5.dashboardPassword;
    const websiteUrl = req5.websiteUrl;
    const websitePassword = req5.websitePassword;
    const databaseUrl = `${req5.dashboardUrl}${getUrlPathname(
      req5.websiteUrl
    )}`;

    const props = {
      name: 'skybitz/fifth',
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
    let result = await getSkybitz(props);

    if (result?.success === true) {
      output = {
        id: 105,
        api: 'api/100/skybitz/fifth',
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 105,
        api: 'api/100/skybitz/fifth',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 105,
      api: 'api/100/skybitz/fifth',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }
  allData[objIndex].email = websiteEmail;
  allData[objIndex].status = output?.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output?.success;
  allData[objIndex].message = output?.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});

const req6 = {
  dashboardUrl: dashboardUrl,
  dashboardEmail: dashboardEmail,
  dashboardPassword: dashboardPassword,

  websiteUrl: 'https://insight.skybitz.com',
  websiteEmail: 'jmadumarov',
  websitePassword: password?.pwd106,
  pathname: '/skybitz/sixth',
};
//!-1 get equipments.
router.post('/skybitz/sixth', async function (req, res, next) {
  let output = null;
  let lastAttemptDate = req.body?.lastAttemptDate;

  let objIndex = allData.findIndex((obj) => obj.id == 106);
  const leaserName = allData[objIndex].leaserName;
  const companyName = allData[objIndex].companyName;
  const websiteEmail = allData[objIndex].email;

  try {
    const dashboardUrl = `${req6.dashboardUrl}/api/auth/login`;
    const dashboardEmail = req6.dashboardEmail;
    const dashboardPassword = req6.dashboardPassword;
    const websiteUrl = req6.websiteUrl;
    const websitePassword = req6.websitePassword;
    const databaseUrl = `${req6.dashboardUrl}${getUrlPathname(
      req6.websiteUrl
    )}`;

    const props = {
      name: 'skybitz/sixth',
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
    let result = await getSkybitz(props);

    if (result?.success === true) {
      output = {
        id: 106,
        api: 'api/100/skybitz/sixth',
        status: 'SUCCESS',
        success: true,
        message: result?.message,
      };
    } else {
      output = {
        id: 106,
        api: 'api/100/skybitz/sixth',
        status: 'FAIL',
        success: false,
        message: result?.message,
      };
    }
  } catch (error) {
    output = {
      id: 106,
      api: 'api/100/skybitz/sixth',
      status: 'FAIL',
      success: false,
      message: error?.message || 'Any error occurred with bot!',
    };
  }
  allData[objIndex].email = websiteEmail;
  allData[objIndex].status = output?.status;
  allData[objIndex].lastUpdateDate = new Date();
  allData[objIndex].success = output?.success;
  allData[objIndex].message = output?.message;
  allData[objIndex].lastAttemptDate = lastAttemptDate;
  allData[objIndex].timeInterval = timeInterval;
  return await res.json(output);
});

module.exports = router;
