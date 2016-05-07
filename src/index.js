#!/usr/bin/env node
// @TODO: remove when not needed
import util from 'util';
import http from 'http';
import createHandler from 'github-webhook-handler';

import configuration from './config';

import IssueHandler from './lib/issue-handler';
import FirebaseClient from './lib/firebase-client';
import repos from './repos';

const handler = createHandler(configuration.webhook);
/*const dataStoreClient = new FirebaseClient(configuration.firebaseHost);*/
/*const issueHandler = new IssueHandler(dataStoreClient, repos);*/

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(configuration.port, configuration.ip);

handler.on('error', (err) =>  console.error('Error:', err.message) );

handler.on('ping', function (event) {
  console.log('Received ping event for %s to %s',
    event.payload.repository.name,
    util.inspect(event.payload.hook, false, null)
  );
});

handler.on('issues', function (event) {
  const supportedActions = ['edited', 'labeled', 'unlabeled', 'closed', 'reopened'];
  const action = event.payload.action;

  if (supportedActions.indexOf(action) === -1) {
    console.log(`Unsupported action: ${action}`);
    return;
  }

  logging(action, event);
  switch( event.payload.action ) {
    case 'edited':
      issueHandler.edit(event);
      break;
    case 'labeled':
      issueHandler.label(event);
      break;
    case 'unlabeled':
      issueHandler.unlabel(event);
      break;
    case 'closed':
      issueHandler.close(event);
      break;
    case 'reopened':
      issueHandler.reopen(event);
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
