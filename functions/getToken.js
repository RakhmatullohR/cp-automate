const { default: fetch } = require('node-fetch');
async function getToken({
  dashboardUrl,
  dashboardEmail,
  dashboardPassword,
  name,
}) {
  const token = await fetch(dashboardUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: dashboardEmail.toString(),
      password: dashboardPassword.toString(),
      firebaseToken: 'string',
      platform: 'WEB_DASHBOARD',
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('--> "' + name + '" has got the token');
      return res.meta.token;
    })
    .catch((err) => {
      return {
        success: false,
        message: err?.message || 'Error occurred with taking "token"!',
      };
    });
  return token;
}
module.exports = getToken;


