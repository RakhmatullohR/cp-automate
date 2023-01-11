var express = require('express');
const { default: fetch } = require('node-fetch');
const allData = require('../mocks/allData');
var router = express.Router();

/* GET home page. */
router.get('/all-data/list', async function (req, res, next) {
  try {
    await res.status(200).json({
      success: true,
      dataList: allData,
      meta: { total: allData.length },
      message: 'Successfully',
    });
  } catch (error) {
    await res.status(200).json({
      success: true,
      dataList: allData,
      meta: { total: allData.length },
      messsage: error.message || 'Unsuccessfully',
    });
  }
});
let isOn = true;
async function runAllData() {
  if (isOn) {
    for (let i = 0; i < allData.length; i++) {
      const data = allData[i];
      await fetch(`${process.env.NODE_APP_BASE_URL}/${data.api}`, {
        method: 'POST',
        body: JSON.stringify({
          lastAttemptDate: new Date(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    }
    await runAllData();
  }
}
router.get('/run-all', async function () {
  isOn = true;
  await runAllData();
});
router.get('/stop-all', async function (req, res, next) {
  console.log('isOn = false');
  isOn = false;
  return await res.send(isOn);
});

module.exports = router;
