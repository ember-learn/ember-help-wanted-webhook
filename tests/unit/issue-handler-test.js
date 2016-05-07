/* jshint node: true */
/* jshint mocha: true */
'use strict';

var assert = require('assert');
var path = require('path');
var sinon = require('sinon');

var DataStore = require('../../lib/datastore-client');
var IssueHandler = require('../../lib/issue-handler');
var fakeEvent = require('../fixtures/unlabeled-event');

describe('adding a label to an issue', function() {
  var fakeEvent = require('../fixtures/labeled-event');

  it('updates Firebase', function() {

    //var addIssue = sinon.spy(new DataStore('test-host'), 'addIssue');
    var dataStore = new DataStore('test-host');
    var stub = sinon.stub(dataStore, 'addIssue').returns(true);

    var expectedIssueHash = {
      id: 1,
      url: 'https://github.com/emberjs/ember.js/issues/1',
      title: 'Testing issue',
      labels: [{
        "url": "https://api.github.com/repos/emberjs/ember.js/labels/Needs%20Help",
        "name": "Needs Help",
        "color": "84b6eb"
      }],
      repo: 'emberjs/ember.js',
      repoUrl: 'https://github.com/emberjs/ember.js'
    };
    //datastore.expects('addIssue').once().withArgs('emberjs/ember.js', 1, expectedIssueHash);

    var issueHandler = new IssueHandler(dataStore);
    var result = issueHandler.issueLabeled(fakeEvent);

    assert.equal(result, true, 'issue not properly sent to Firebase');

    stub.restore();
  });
});

describe('removing a label removes it from our Firebase list', function() {
  it('updates Firebase', function() {

    var result = IssueHandler.issueUnlabeled(fakeEvent);
    assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
    assert.ok(result, 'issue not properly removed');
  });
});

describe('closing a label removes it from our Firebase list', function() {
  it('updates Firebase', function () {
    var result = IssueHandler.issueClosed(fakeEvent);
    assert.ok(result, 'issue not properly removed');
    assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
  });
});
describe('reopening a label adds it to our Firebase list', function() {
  it('updates Firebase', function () {
    var result = IssueHandler.issueReopened(fakeEvent);
    assert.ok(result, 'issue not properly reopened');
    assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
  });
});

describe('renaming an issue updates its title on Firebase', function() {
  it('updates Firebase', function() {
    assert.ok(false, 'Need to confirm that title updates properly');
  });
});

describe('addIssueToDatastore updates Firebase as desired', function() {
  it('saving works', function () {
    assert.ok(false, 'Confirm that adding issues works');
  });
});

describe('removeIssueFromDatastore updates Firebase as desired', function() {
  it('deleting works', function () {
    assert.ok(false, 'Confirm that removing issues works');
  });
});

describe('updateIssueInDatastore updates Firebase as desired', function() {
  it('updating works', function () {
    assert.ok(false, 'Confirm that updating issues works');
  });
});
