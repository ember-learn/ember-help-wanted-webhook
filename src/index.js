#!/usr/bin/env node
// @TODO: remove when not needed
import util from 'util';
import http from 'http';
import createHandler from 'github-webhook-handler';
import Firebase from "firebase";

import configuration from './config';
import IssueHandler from './lib/issue-handler';
import DataStore from './lib/data-store';
import repos from './repos';
import logger from './lib/logger';


const handler = createHandler(configuration.webhook);
const firebaseClient = new Firebase(configuration.firebase.host);
const dataStore = new DataStore(firebaseClient, configuration.firebase.secret, configuration.firebase.writeUserId);
const issueHandler = new IssueHandler(dataStore, repos);

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(configuration.port, configuration.ip);

handler.on('error', (err) =>  logger.error('Error:', err.message) );

handler.on('ping', function (event) {
  logger.info('Received ping event for %s to %s',
    event.payload.repository.name,
    util.inspect(event.payload.hook, false, null)
  );
});

handler.on('issues', function (event) {
  const supportedActions = ['edited', 'labeled', 'unlabeled', 'closed', 'reopened'];
  const action = event.payload.action;

  if (supportedActions.indexOf(action) === -1) {
    logger.debug(`Unsupported action: ${action}`);
    return;
  }

  logger.info(event);

  let op;
  switch( event.payload.action ) {
    case 'edited':
      op = issueHandler.edit(event);
      break;
    case 'labeled':
      op = issueHandler.label(event);
      break;
    case 'unlabeled':
      op =  issueHandler.unlabel(event);
      break;
    case 'closed':
      op = issueHandler.close(event);
      break;
    case 'reopened':
      op = issueHandler.reopen(event);
      break;
    default:
      return
  }

  op.then(function() {
    logger.info('Success', event.payload.issue.id);
  }, function(reason) {
    logger.error('Failed', reason, event.payload.issue.id);
  });

});

