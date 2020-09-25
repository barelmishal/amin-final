var express = require('express');
var jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
var router = express.Router();
var db = require('../db');

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

router.get('/me', async function(req, res, next) {
  const authToken = req.cookies.userToken;
  if (authToken) {
    try {
      jwt.verify(authToken, AUTH_SECRET, async (err, userInfo) => {
        if (err) {
          console.warn('recive bad user token');

          return;
        }

        try {
          const user = await db('users').select().where({id: userRef.uid});
          if (user.length) {
            await db('users').update({last_seen: new Date()}).where({id: userRef.uid});
            res.json(user[0]);
          } else {
            res.sendStatus(404);
          };
        } catch (err) {
          next(err);
        }

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
  if (googleToken) {
    try {
      const payload = await verify(googleToken) // we whant to tack email first and last name and when we will store in the database also the id!!
      const user = {
        google_id: payload.sub,
        email: payload.email,
        first_name: payload.given_name,
        last_name: payload.family_name,
        last_seen: new Date(),
        created: new Date()
      };

      const dbUser = await db('users').select().where({google_id: user.google_id});
      if (!dbUser.length) {
        const result = await db('users').insert(user, 'id');
        user.id = result[0];
      } else {
        await db('users').update(user).where({google_id: user.google_id});
        user.id = dbUser[0].id;
      }


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
});

router.post('/logout', async function(req, res, next) {
  res.clearCookie('userToken');
  res.sendStatus(200);
});
  
module.exports = router;
