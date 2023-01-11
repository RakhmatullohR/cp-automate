```js
let myIntervalFirst;
function functionPost() {
  // some code
  let count = 0;
  myIntervalFirst = setInterval(async () => {
    count += 1;

    result = await getSkybitz(props);
  }, timeInterval);
  // some code
}
router.post('/skybitz/first/stop', async function (req, res, next) {
  try {
    clearInterval(myIntervalFirst);
    res.json({
      success: true,
      message: '[api/100/skybitz/first] has been stopped by owner!',
    });
  } catch (error) {
    res.json({
      success: false,
      message:
        error.message || '[api/100/skybitz/first] has not been stopped yet!',
    });
  }
});
```
