'use strict'

const session = require('client-sessions')

function checkEnv () {
  if (process.env.SESSION_ENCRYPTION_KEY === undefined) {
    throw new Error('cookie encryption key is not set')
  }
  if (process.env.COOKIE_MAX_AGE === undefined) {
    throw new Error('cookie max age is not set')
  }
}

function sessionCookie () {
  checkEnv()
  return session({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: process.env.SESSION_ENCRYPTION_KEY,
    duration: parseInt(process.env.COOKIE_MAX_AGE), // how long the session will stay valid in ms
    proxy: true,
    cookie: {
      ephemeral: false, // when true, cookie expires when the browser closes
      httpOnly: true, // when true, cookie is not accessible from javascript
      secureProxy: true
    }
  })
}

module.exports = {
  sessionCookie: sessionCookie
}
