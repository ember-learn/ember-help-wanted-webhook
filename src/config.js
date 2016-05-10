export default {
  ip:           process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  port:         process.env.OPENSHIFT_NODEJS_PORT || 8080,
  firebase: {
    host: process.env.FIREBASE_APP || 'https://help-wanted-dev.firebaseio.com',
    secret: process.env.FIREBASE_SECRET || 'firebase_secret_token',
    writeUserId: process.env.FIREBASE_WRITE_USER_ID || '4',
  },

  webhook: {
    path: '/issue-handler',
    secret: process.env.WEBHOOK_SECRET || 'oursecrethere',
  },
};
