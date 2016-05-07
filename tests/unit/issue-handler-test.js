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

      assert.equal(result, true, 'Record was updated');
      store.addIssue.calledWith(issueForPayloadWithReqLabel);

    });
  });

  describe(`Closing issues`, function() {
    it(`removes the title on the client store`, function() {
      store.removeIssue.withArgs(issueForPayloadWithReqLabel).returns(true);

      const result = issueHandler.close({payload: payloadWithReqLabel('closed')});

      assert.equal(result, true, 'Record was removed');
      store.removeIssue.calledWith(issueForPayloadWithReqLabel);

    });
  });

  describe(`Reopening issues`, function() {
    it(`saves to the store when there's a valid label`, function() {
      store.addIssue.withArgs(issueForPayloadWithReqLabel).returns(true);
      const result = issueHandler.reopen({ payload: payloadWithReqLabel('reopened') });
      assert.ok(result, 'Record is saved');
      store.addIssue.calledWith(issueForPayloadWithReqLabel);
    });
  });

});
