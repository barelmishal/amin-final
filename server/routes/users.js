var express = require('express');
const { OAuth2Client } = require('google-auth-library');
var router = express.Router();

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const AUTH_SECRET = process.env.AUTH_SECRET;

const REQUIRE_HTTPS_COOKIE = !!process.env.REQUIRE_HTTPS_COOKIE;
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, 
  });
  return ticket.getPayload();
}

router.post("/me", (req, res, next) => {
  const googleToken = req.body.googleToken;
  if (googleToken) {
    try {
      const payload = await verify(googleToken) 
    } catch (err) {
      next(err)
    } 
  } else {
    res.sendStatus(400);
  }
})
  
module.exports = router;
