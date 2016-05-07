export default {
  ip:           process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  port:         process.env.OPENSHIFT_NODEJS_PORT || 8080,
  firebaseHost: process.env.FIREBASE_APP || '"https://<app-name>.firebaseio.com/";',

  webhook: {
    path: '/issue-handler',
    secret: process.env.WEBHOOK_SECRET || 'oursecrethere',
  },
};
