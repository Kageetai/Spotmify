/* eslint-disable global-require */
const moment = require('moment');

const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email';

/**
 * Spotify login middleware
 */
module.exports = (app, options) => {
  app.use(cookieParser());

  app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    res.redirect(`https://accounts.spotify.com/authorize?${
      querystring.stringify({
        response_type: 'code',
        client_id: options.clientId,
        scope,
        redirect_uri: options.redirectUri,
        state,
      })}`);
  });

  app.get('/callback', (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(`/#${
        querystring.stringify({
          error: 'state_mismatch',
        })}`);
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code,
          redirect_uri: options.redirectUri,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization: `Basic ${Buffer.from(`${options.clientId}:${options.clientSecret}`).toString('base64')}`,
        },
        json: true,
      };

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          // eslint-disable-next-line camelcase
          const { access_token, refresh_token, expires_in } = body;
          res.cookie('accessToken', access_token);
          res.cookie('refreshToken', refresh_token);
          res.cookie('expires', moment().add(expires_in, 's').format());
          res.redirect('/');
        } else {
          res.redirect('/');
        }
      });
    }
  });

  app.get('/refresh_token', (req, res) => {
    // requesting access token from refresh token
    const { refreshToken } = req.cookies;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { Authorization: `Basic ${Buffer.from(`${options.clientId}:${options.clientSecret}`).toString('base64')}` },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // eslint-disable-next-line camelcase
        const { access_token, expires_in } = body;
        res.send({
          accessToken: access_token,
          expires: moment().add(expires_in, 's').format(),
        });
      }
    });
  });

  return app;
};
