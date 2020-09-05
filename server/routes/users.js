var express = require('express');
var jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
var router = express.Router();
var knex = require('knex')

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const AUTH_SECRET = process.env.AUTH_SECRET;

const REQUIRE_HTTPS_COOKIE = !!process.env.REQUIRE_HTTPS_COOKIE;
const client = new OAuth2Client(CLIENT_ID);

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, 
  });
  return ticket.getPayload();
}

router.get('/me', async function(req, res, next) {
  const authToken = req.cookies.userToken;
  if (authToken) {
    try {
      jwt.verify(authToken, AUTH_SECRET, (err, userInfo) => {
        if (err) {
          next(err);
          return;
        }

        /*
        TODO: This is where we will:
        1. fetch the user information from our database.
        2. update the last seen time of the user in our database
        */

        // The decrypted JSON string has this extra property that 
        // we don't want to send in the response. So we delete it
        delete userInfo.iat;
        res.json(userInfo);
      });
    } catch (err) {
       next(err);
    }
  } else {
    res.sendStatus(404);
  }
});

router.post("/me", async (req, res, next) => {
  const googleToken = req.body.googleToken;
  console.log(googleToken);
  if (googleToken) {
    try {
      const payload = await verify(googleToken) // we whant to tack email first and last name and when we will store in the database also the id!!
      const user = {
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email
      };
      jwt.sign(user, AUTH_SECRET, (err, authToken) => {
        // Check if there was an error encrypting the user information
        if (err) {
          // There as an an error encrypting the user information.
          // Send an HTTP 500 (Internal Server Error).
          // Calling `next(err)` triggers the default error 
          // handler that is defined `App.js`.
          next(err);
          return;
        }

        

        // Set the encrypted user JSON object as the `userToken` cookie.
        // As explained above the browser will implicitly store and send
        // this in the request header (including requests to static assets like images).
        res.cookie('userToken', authToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // <--- Login expires in one month
          httpOnly: true, // <--- This says that only the server can access the cookie and not client-side JavaScript
          secure: REQUIRE_HTTPS_COOKIE // <--- Set to true only in production where we want to require HTTPS to prevent the `userToken` from being stolen
        });

        // Send the user information as JSON in the response
        res.json(user);
      });
    } catch (err) {
      next(err)
    } 
  } else {
    res.sendStatus(400); 
  }
})
  
module.exports = router;
