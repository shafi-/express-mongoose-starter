module.exports = {
  JWT_SECRET: 'jwt_dev_sec',
  oauth: {
    google: {
      clientID:
        '568307991284-226ng2ognnu95ec9tn6a5lvbu263497s.apps.googleusercontent.com',
      clientSecret: 'YRUBki1sCF0LVRZuZJxGcKpK'
    },
    facebook: {
      clientID: process.env.OUTH_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.OUTH_FACEBOOK_CLIENT_SECRET
    }
  }
};
