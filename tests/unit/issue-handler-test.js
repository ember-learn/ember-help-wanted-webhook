/* jshint node: true */
/* jshint mocha: true */
'use strict';

import assert from 'assert';
import path from 'path';
import sinon from 'sinon';

import IssueHandler from '../../src/lib/issue-handler';
import UnlabeledEvent from '../fixtures/unlabeled-event';
import LabeledEvent from '../fixtures/labeled-event';

describe('adding a label to an issue', function() {

  it('updates Firebase', function() {

    var addIssue = sinon.spy(IssueHandler, 'addIssueToDatastore');
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

    var result = IssueHandler.issueLabeled(LabeledEvent);

    addIssue.restore();
    sinon.assert.calledWith(addIssue, expectedIssueHash);

    assert.ok(result, 'issue not properly sent to Firebase');
  });
});

describe('removing a label removes it from our Firebase list', function() {
  it('updates Firebase', function() {

    var result = IssueHandler.issueUnlabeled(UnlabeledEvent);
    assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
    assert.ok(result, 'issue not properly removed');
  });
});

describe('closing a label removes it from our Firebase list', function() {
  it('updates Firebase', function () {
    var result = IssueHandler.issueClosed(UnlabeledEvent);
    assert.ok(result, 'issue not properly removed');
    assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
  });
});

describe('reopening a label adds it to our Firebase list', function() {
  it('updates Firebase', function () {
    var result = IssueHandler.issueReopened(UnlabeledEvent);
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
