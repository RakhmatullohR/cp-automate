const FormData = require('form-data');
const { default: fetch } = require('node-fetch');
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const getToken = require('../functions/getToken');
const getStarleaseData = async (props) => {
  const {
    name,
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
  } = props;
  let result = null;
  const token = await getToken({
    dashboardUrl,
    dashboardEmail,
    dashboardPassword,
    name,
  }).catch(async (res) => {
    result = res;
    await browser.close();
    throw result;
  });
  const browser = await puppeteer.launch(options).catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with lounching!',
    };
    await browser.close();
    throw result;
  });
  const page = await browser.newPage().catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with creating new page!',
    };
    await browser.close();
    throw result;
  });
  await page.setUserAgent(userAgentString).catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with "setUserAgent"!',
    };
    await browser.close();
    throw result;
  });
  await page
    .goto(websiteUrl, {
      waitUntil: 'networkidle2',
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with "going to login page"!',
      };
      await browser.close();
      throw result;
    });
  await page.waitForTimeout(20000).catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting!',
    };
    await browser.close();
    throw result;
  });

  await page
    .type('input[id="login-username"]', websiteEmail)
    .catch(async (err) => {
      result = {
        success: false,
        message:
          err?.message || 'Error occurred with filling "email or username"!',
      };
      await browser.close();
      throw result;
    });
  await page
    .type('input[id="Password"]', websitePassword)
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with filling "password"!',
      };
      await browser.close();
      throw result;
    });
  await page.click('input[type="submit"]').catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with clicking "login button"!',
    };
    await browser.close();
    throw result;
  });
  await page.waitForTimeout(20000).catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting!',
    };
    await browser.close();
    throw result;
  });
  await page.click('#cust-nav-active').catch(async (err) => {
    result = {
      success: false,
      message:
        err?.message || 'Error occurred with clicking "#cust-nav-active"!',
    };
    await browser.close();
    throw result;
  });
  await page.waitForTimeout(20000).catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting!',
    };
    await browser.close();
    throw result;
  });
  const client = await page.target().createCDPSession();
  await client
    .send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath,
    })
    .catch(async (err) => {
      result = {
        success: false,
        message:
          err?.message || 'Error occurred with "target downlaod button"!',
      };
      await browser.close();
      throw result;
    });
  await page.waitForTimeout(20000).catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting!',
    };
    await browser.close();
    throw result;
  });
  // wait export button & click
  await page.waitForSelector('#download-table-button').catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with weiting "download button"!',
    };
    await page.reload({ waitUntil: 'networkidle0' }).catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with reload!',
      };
      await browser.close();
      throw result;
    });
    await page.waitForTimeout(20000).catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with waiting!',
      };
      await browser.close();
      throw result;
    });
  });
  await page.click('#download-table-button').catch(async (err) => {
    result = {
      success: false,
      message:
        err?.message || 'Error occurred with clicking "download button"!',
    };
    await browser.close();
    throw result;
  });

  // Form Date
  var filename = __dirname + '/../download/websiteData/Equipment.csv';
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filename));
  formData.append('trip-stage', 'starlease');

  console.log('[starlease] => sending request ...');
  console.log(
    `${databaseUrl}?company-name=${companyName}&leaser=${leaserName}`
  );
  await fetch(
    `${databaseUrl}?company-name=${companyName}&leaser=${leaserName}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .then(async (res) => {
      if (res.success) {
        result = {
          success: true,
          message: 'File uploaded successfully!',
        };
      } else {
        console.log(res);
        result = {
          success: false,
          message: res?.message || 'Error occurred with uploading file!',
        };
        await browser.close();
        throw result;
      }
    })
    .catch(async (err) => {
      console.log(err);
      result = {
        success: false,
        message: err?.message || 'Error occurred with uploading file!',
      };
      await browser.close();
      throw result;
    });

  // await page.waitForTimeout(20000);
  await browser.close();
  return result;
};

module.exports = getStarleaseData;
