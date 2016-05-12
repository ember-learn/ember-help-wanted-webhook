/* jshint node: true */
/* jshint mocha: true */
'use strict';

import assert from 'assert';
import path from 'path';
import sinon from 'sinon';
import Promise from 'bluebird'

import IssueHandler from '../../src/lib/issue-handler';
import fixtures from '../fixtures';

const repos ={
  'emberjs-blr/github-webhook-test-repo': {
    labels: [
      'bug',
    ]
  }
};

const {
  payloadWithReqLabel,
  payloadWithReqLabelButNoLabels,
  payloadWithoutReqLabel,
  issueForPayloadWithReqLabel,
  issueForPayloadWithReqLabelButNoLabels,
  issueForClosedPayloadWithoutReqLabel,
  issueForClosedPayloadWithReqLabel
} = fixtures;

describe(`Issue Handler Tests`, function() {

  var issueHandler;
  var store;

  beforeEach(function() {
    let dummyStore = {
      addIssue() {},
      removeIssue() {}
    };
    store = sinon.stub(dummyStore);
    issueHandler = new IssueHandler(store, repos);
  });

  afterEach(function() {
    store.addIssue.restore();
    store.removeIssue.restore();
  });

  describe(`Adding a label to an issue`, function() {

    it(`updates the store when there's a valid label`, function(done) {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(Promise.resolve(true));
      issueHandler.label({ payload: payloadWithReqLabel('labeled') }).then(function() {
        assert.ok(true, 'Record is saved');
        assert.ok(store.addIssue.calledWith(issueForPayloadWithReqLabel));
        done();
      });
    });

    it(`doesn't update the store when there's no valid label`, function(done) {
      issueHandler.label({ payload: payloadWithoutReqLabel('labeled')}).then(function() {}, function() {
        assert.ok(true, 'Record was discarded');
        assert.equal(store.addIssue.callCount, 0, `Store shouldn't be called for discarded payloads`);
        done();
      });
    });

  });

  describe(`Unlabeling issues`, function() {

    it(`removes the issue from the store when it no longer has a valid label`, function(done) {
      store.removeIssue.withArgs(issueForClosedPayloadWithoutReqLabel).returns(Promise.resolve(true));
      issueHandler.unlabel({ payload: payloadWithoutReqLabel('unlabeled')}).then(function() {
        assert.ok(true, 'Record is removed');
        assert.ok(store.removeIssue.calledWith(issueForClosedPayloadWithoutReqLabel));
        done();
      });
    });

    it(`removes the issue from the store when it no longer has any labels`, function(done) {
      store.removeIssue.withArgs(issueForPayloadWithReqLabelButNoLabels).returns(Promise.resolve(true));
      issueHandler.unlabel({ payload: payloadWithReqLabelButNoLabels('unlabeled')}).then(function() {
        assert.ok(true, 'Record is removed');
        assert.ok(store.removeIssue.calledWith(issueForPayloadWithReqLabelButNoLabels));
        done();
      });
    });

    it(`saves the issue when there's still a valid label after a unlabel event`, function(done) {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(Promise.resolve(true));
      issueHandler.unlabel({ payload: payloadWithReqLabel('unlabeled')}).then(function() {
        assert.ok(true, 'Record was discarded');
        assert.ok(store.addIssue.calledWith(issueForPayloadWithReqLabel));
        done();
      });
    });

  });

  describe(`Editing issues`, function() {

    it(`updates the title on the client store`, function(done) {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(Promise.resolve(true));
      issueHandler.edit({payload: payloadWithReqLabel('edited')}).then(function() {
        assert.ok(true, 'Record was updated');
        assert.ok(store.addIssue.calledWith(issueForPayloadWithReqLabel));
        done();
      });
    });

  });

  describe(`Closing issues`, function() {

    it(`removes the title on the client store`, function(done) {
      store.removeIssue.withArgs(issueForClosedPayloadWithReqLabel).returns(Promise.resolve(true));
      issueHandler.close({payload: payloadWithReqLabel('closed')}).then(function() {
        assert.ok(true, 'Record was removed');
        assert.ok(store.removeIssue.calledWith(issueForClosedPayloadWithReqLabel));
        done();
      });
    });

  });

  describe(`Reopening issues`, function() {

    it(`saves to the store when there's a valid label`, function(done) {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(Promise.resolve(true));
      issueHandler.reopen({ payload: payloadWithReqLabel('reopened') }).then(function() {
        assert.ok(true, 'Record is saved');
        assert.ok(store.addIssue.calledWith(issueForPayloadWithReqLabel));
        done();
      });
    });

  });

});
