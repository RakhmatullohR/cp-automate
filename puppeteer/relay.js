const FormData = require('form-data');
const { default: fetch } = require('node-fetch');
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const getToken = require('../functions/getToken');
const getAmzRelayData = async (props) => {
  const {
    name,
    dashboardUrl,
    dashboardEmail,
    dashboardPassword,

    websiteUrl,
    websiteEmail,
    websitePassword,
    databaseUrl,
    // leaserName,
    // companyName,

    options,
    userAgentString,
    downloadPath,
  } = props;
  let result = null;
  const fileNames = [];
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
    .click("a[onclick=\"logNexusEvent('CLICK', 'SIGN-IN', {})\"]")
    .catch(async (err) => {
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
  await page.type('input[id="ap_email"]', websiteEmail).catch(async (err) => {
    result = {
      success: false,
      message:
        err?.message || 'Error occurred with filling "email or username"!',
    };
    await browser.close();
    throw result;
  });
  await page
    .type('input[id="ap_password"]', websitePassword)
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with filling "password"!',
      };
      await browser.close();
      throw result;
    });
  await page.click('input[type=checkbox]').catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with clicking "login button"!',
    };
    await browser.close();
    throw result;
  });
  await page.click('input[id="signInSubmit"]').catch(async (err) => {
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
  // ===================UPCOMMING============
  await page
    .goto('https://relay.amazon.com/tours/tours?state=upcoming', {
      waitUntil: 'networkidle2',
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with "going to upcoming"!',
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

  const client1 = await page.target().createCDPSession();
  await client1
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
  await page.waitForSelector('i.fa.fa-download').catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting "download button"!',
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
  await page.click('i.fa.fa-download').catch(async (err) => {
    result = {
      success: false,
      message:
        err?.message || 'Error occurred with clicking "download button"!',
    };
    await browser.close();
    throw result;
  });
  await page.waitForTimeout(20000);
  // Form Date
  var filename1 = __dirname + '/../download/websiteData/Trips.csv';
  const formData1 = new FormData();
  formData1.append('file', fs.createReadStream(filename1));
  formData1.append('trip-stage', 'upcoming');

  console.log('[file-of-upcoming] => sending request ...');
  await fetch(`${databaseUrl}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData1,
  })
    .then((response) => response.json())
    .then(async (res) => {
      if (res.success) {
        fileNames.push('ucomming');
        result = {
          success: true,
          message: `files [${fileNames.join(', ')}] uploaded successfully!`,
        };
      } else {
        result = {
          success: false,
          message: res?.message || 'Error occurred with uploading file!',
        };
        await browser.close();
        throw result;
      }
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with uploading file!',
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
  // ============== IN-TRANZIT =============
  await page
    .goto('https://relay.amazon.com/tours/tours?state=in-transit', {
      waitUntil: 'networkidle2',
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with "going to in-transit"!',
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

  const client2 = await page.target().createCDPSession();
  await client2
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
  await page.waitForSelector('i.fa.fa-download').catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting "download button"!',
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
  await page.click('i.fa.fa-download').catch(async (err) => {
    result = {
      success: false,
      message:
        err?.message || 'Error occurred with clicking "download button"!',
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
  // Form Date
  var filename2 = __dirname + '/../download/websiteData/Trips.csv';
  const formData2 = new FormData();
  formData2.append('file', fs.createReadStream(filename2));
  formData2.append('trip-stage', 'in-transit');

  console.log('[file-of-in-transit] => sending request ...');
  await fetch(`${databaseUrl}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData2,
  })
    .then((response) => response.json())
    .then(async (res) => {
      if (res.success) {
        fileNames.push('in-transit');
        result = {
          success: true,
          message: `Files [${fileNames.join(', ')}] uploaded successfully!`,
        };
      } else {
        result = {
          success: false,
          message: res?.message || 'Error occurred with uploading file!',
        };
        await browser.close();
        throw result;
      }
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with uploading file!',
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

  // =================== HISTORY =====================
  await page
    .goto('https://relay.amazon.com/tours/tours?state=history', {
      waitUntil: 'networkidle2',
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with "going to history"!',
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

  const client3 = await page.target().createCDPSession();
  await client3
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
  await page.waitForSelector('i.fa.fa-download').catch(async (err) => {
    result = {
      success: false,
      message: err?.message || 'Error occurred with waiting "download button"!',
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
    });
    await browser.close();
    throw result;
  });
  await page.click('i.fa.fa-download').catch(async (err) => {
    result = {
      success: false,
      message:
        err?.message || 'Error occurred with clicking "download button"!',
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
  // Form Date
  var filename3 = __dirname + '/../download/websiteData/Trips.csv';
  const formData3 = new FormData();
  formData3.append('file', fs.createReadStream(filename3));
  formData3.append('trip-stage', 'history');

  console.log('[file-of-history] => sending request ...');
  await fetch(`${databaseUrl}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData3,
  })
    .then((response) => response.json())
    .then(async (res) => {
      if (res.success) {
        fileNames.push('history');
        result = {
          success: true,
          message: `Files [${fileNames.join(', ')}] uploaded successfully!`,
        };
      } else {
        result = {
          success: false,
          message: res?.message || 'Error occurred with uploading file!',
        };
        await browser.close();
        throw result;
      }
    })
    .catch(async (err) => {
      result = {
        success: false,
        message: err?.message || 'Error occurred with uploading file!',
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

  // await page.waitForTimeout(20000);
  await browser.close();
  return result;
};

module.exports = getAmzRelayData;
