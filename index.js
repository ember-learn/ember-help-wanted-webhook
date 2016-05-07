#!/usr/bin/env node
// @TODO: remove when not needed
var util = require('util');

var http = require('http');
var createHandler = require('github-webhook-handler');
var DataStore = require('./lib/datastore-client');
var IssueHandler = require('./lib/issue-handler');

var config = {
  firebaseHost: process.env.FIREBASE_APP || 'https://<app-name>.firebaseio.com/',
  ip: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  path: '/issue-handler',
  port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
  secret: process.env.WEBHOOK_SECRET || 'oursecrethere'
};

var handler = createHandler({ path: config.path, secret: config.secret });

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(config.port, config.ip);

handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('ping', function (event) {
  console.log('Received ping event for %s to %s',
    event.payload.repository.name,
    util.inspect(event.payload.hook, false, null)
  );
});

handler.on('issues', function (event) {

  var dataStore = new DataStore();
  var issueHandler = new IssueHandler(dataStore);

  switch( event.payload.action ) {
    case 'labeled':
      logging('labeled', event);
      issueHandler.issueLabeled(event);
      break;
    case 'unlabeled':
      logging('unlabeled', event);
      issueHandler.issueUnlabeled(event);
      break;
    case 'closed':
      logging('closed', event);
      issueHandler.issueClosed(event);
      break;
    case 'reopened':
      logging('reopened', event);
      issueHandler.issueReopened(event);
      break;
    default:
      // we don't want to do anything in other cases
  }
});

function logging(type, event) {
  console.log('Received an %s issue event for %s action=%s: #%d %s',
    type,
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
}
