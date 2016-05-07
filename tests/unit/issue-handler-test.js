/* jshint node: true */
/* jshint mocha: true */
'use strict';

import assert from 'assert';
import path from 'path';
import sinon from 'sinon';

import IssueHandler from '../../src/lib/issue-handler';
import fixtures from '../fixtures';
import repos from '../../src/repos';

const {
  payloadWithReqLabel,
  payloadWithoutReqLabel,
  issueForPayloadWithReqLabel,
  issueForPayloadWithoutReqLabel
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

    it(`updates the store when there's a valid label`, function() {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(true);
      const result = issueHandler.label({ payload: payloadWithReqLabel('labeled') });
      assert.ok(result, 'Record is saved');
      store.addIssue.calledWith(issueForPayloadWithReqLabel);
    });


    it(`doesn't update the store when there's no valid label`, function() {
      const result = issueHandler.label({ payload: payloadWithoutReqLabel('labeled')});

      assert.equal(result, false, 'Record was discarded');
      assert.equal(store.addIssue.callCount, 0, `Store shouldn't be called for discarded payloads`);
    });

  });

  describe(`Unlabeling issues`, function() {

    it(`removes the issue from the store when it no longer has a valid label`, function() {
      store.removeIssue.withArgs(issueForPayloadWithoutReqLabel).returns(true);

      const result = issueHandler.unlabel({ payload: payloadWithoutReqLabel('unlabeled')});
      assert.ok(result, 'Record is removed');
      store.removeIssue.calledWith(issueForPayloadWithoutReqLabel);
    });


    it(`saves the issue when there's still a valid label after a unlabel event`, function() {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(true);
      const result = issueHandler.unlabel({ payload: payloadWithReqLabel('unlabeled')});

      assert.equal(result, true, 'Record was discarded');
      store.addIssue.calledWith(issueForPayloadWithReqLabel);
    });

  });

  describe(`Editing issues`, function() {
    it(`updates the title on the client store`, function() {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(true);

      const result = issueHandler.edit({payload: payloadWithReqLabel('edited')});

      assert.equal(result, true, 'Record was saved');
      store.addIssue.calledWith(issueForPayloadWithReqLabel);

    });
  });

  //describe('closing a label removes it from our Firebase list', function() {
    //it('updates Firebase', function () {
      //var result = IssueHandler.issueClosed(UnlabeledEvent);
      //assert.ok(result, 'issue not properly removed');
      //assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
    //});
  //});

  //describe('reopening a label adds it to our Firebase list', function() {
    //it('updates Firebase', function () {
      //var result = IssueHandler.issueReopened(UnlabeledEvent);
      //assert.ok(result, 'issue not properly reopened');
      //assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
    //});
  //});

  //describe('renaming an issue updates its title on Firebase', function() {
    //it('updates Firebase', function() {
      //assert.ok(false, 'Need to confirm that title updates properly');
    //});
  //});

  //describe('addIssueToDatastore updates Firebase as desired', function() {
    //it('saving works', function () {
      //assert.ok(false, 'Confirm that adding issues works');
    //});
  //});

  //describe('removeIssueFromDatastore updates Firebase as desired', function() {
    //it('deleting works', function () {
      //assert.ok(false, 'Confirm that removing issues works');
    //});
  //});

  //describe('updateIssueInDatastore updates Firebase as desired', function() {
    //it('updating works', function () {
      //assert.ok(false, 'Confirm that updating issues works');
    //});
  //});

});
