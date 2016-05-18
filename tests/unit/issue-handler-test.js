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
  issueWithReqLabels,
  payloadWithReqLabels,
  issueWithoutReqLabels,
  payloadWithoutReqLabels,
  issueWithNoLabels,
  payloadWithNoLabels,
} = fixtures;

describe(`Issue Handler Tests`, function() {

  var issueHandler;
  var store;


  beforeEach(function() {
    let dummyStore = {
      addIssue() {},
      removeIssue() {},
      updateIssue() {},
      bulkAdd() {},
    };
    store = sinon.stub(dummyStore);
    issueHandler = new IssueHandler(store, repos);
  });


  afterEach(function() {
    store.addIssue.restore();
    store.removeIssue.restore();
    store.updateIssue.restore();
    store.bulkAdd.restore();
  });


  const testForEdits = (issue, payload, done, editAction) => {
      store.updateIssue.withArgs(issue).returns(Promise.resolve(true));
      issueHandler[editAction]({ payload }).then(function() {
        assert.ok(true, 'Record is edited');
        assert.ok(store.updateIssue.calledWith(issue));
        done();
      });
    };


  describe(`Adding a label to an issue`, function() {
    it(`updates the store when there's a valid label`, function(done) {
      testForEdits(issueWithReqLabels, payloadWithReqLabels, done, 'label');
    });

    it(`updates the store even when there's no valid label`, function(done) {
      testForEdits(issueWithoutReqLabels, payloadWithoutReqLabels, done, 'label');
    });
  });


  describe(`Unlabeling issues`, function() {
    it(`removes the issue from the store when it no longer has a valid label`, function(done) {
      testForEdits(issueWithoutReqLabels, payloadWithoutReqLabels, done, 'unlabel');
    });

    it(`edits the issue from the store when it no longer has any labels`, function(done) {
      testForEdits(issueWithNoLabels, payloadWithNoLabels, done, 'unlabel');
    });

    it(`updates the issue when there's still a valid label after a unlabel event`, function(done) {
      testForEdits(issueWithReqLabels, payloadWithReqLabels, done, 'unlabel');
    });
  });


  describe(`Editing issues`, function() {
    it(`updates the title on the client store`, function(done) {
      testForEdits(issueWithoutReqLabels, payloadWithoutReqLabels, done, 'edit');
    });
  });


  describe(`Closing issues`, function() {
    it(`removes the title on the client store`, function(done) {
      store.removeIssue.withArgs(issueWithReqLabels).returns(Promise.resolve(true));
      issueHandler.close({payload: payloadWithReqLabels}).then(function() {
        assert.ok(true, 'Record was removed');
        assert.ok(store.removeIssue.calledWith(issueWithReqLabels));
        done();
      });
    });
  });


  describe(`Creating issues`, function() {
    it(`saves to the store`, function(done) {
      store.addIssue.withArgs(issueWithReqLabels).returns(Promise.resolve(true));
      issueHandler.add({ payload: payloadWithReqLabels }).then(function() {
        assert.ok(true, 'Record is saved');
        assert.ok(store.addIssue.calledWith(issueWithReqLabels));
        done();
      });
    });
  });

  describe(`Reopening issues`, function() {
    it(`saves to the store`, function(done) {
      store.addIssue.withArgs(issueWithReqLabels).returns(Promise.resolve(true));
      issueHandler.reopen({ payload: payloadWithReqLabels }).then(function() {
        assert.ok(true, 'Record is saved');
        assert.ok(store.addIssue.calledWith(issueWithReqLabels));
        done();
      });
    });
  });


  describe(`Bulk addition of issues`, function() {
    it(`saves to the store `, function(done) {
      store.bulkAdd.withArgs([issueWithReqLabels]).returns(Promise.resolve(true));
      issueHandler.bulkAdd('emberjs-blr/github-webhook-test-repo', [payloadWithReqLabels.issue]).then(function() {
        assert.ok(true, 'Record is saved');
        assert.ok(store.bulkAdd.calledWith([issueWithReqLabels]));
        done();
      });
    });
  });

});
