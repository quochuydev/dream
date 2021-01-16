const path = require('path');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
let mongoose = require('mongoose');

let UserMD = mongoose.model('User');
const { frontend_admin, google_app, hash_token } = require('./config');
let { clientId, clientSecret, redirectUrl } = google_app;
const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
const scopes = ['email', 'profile', 'openid'];
const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });

let auth = async (req, res) => {
  try {
    let { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code)
    let userAuth = jwt.decode(tokens.id_token)
    let { email } = userAuth;
    if (!email) {
      return res.sendStatus(401);
    }
    let user_gen_token = {
      email: userAuth.email,
      exp: (Date.now() + 8 * 60 * 60 * 1000) / 1000
    }
    let userToken = jwt.sign(user_gen_token, hash_token);
    res.redirect(`${frontend_admin}/loading?token=${userToken}`)
  } catch (error) {
    console.log(error);
    res.redirect(`${frontend_admin}/login?message=${encodeURIComponent('Something errror!')}`)
  }
}

function resetPassword(req, res) {

}

function loginGoogle(req, res) {
  res.status(200).send(url);
}

let logout = (req, res) => {
  res.json({ error: false, code: 'LOGOUT' });
}

let logout_redirect = (req, res) => {
  res.redirect(`${frontend_admin}/logout`);
}

module.exports = {
  auth, loginGoogle,
  logout, logout_redirect
}