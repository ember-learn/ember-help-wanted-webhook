/* jshint node: true */
/* jshint mocha: true */
import assert from 'assert';
import sinon from 'sinon';

import Fixtures from '../fixtures';
import DataStore from '../../src/lib/data-store';

const {
  issueForPayloadWithSplRepoName,
  issueForPayloadWithNormalRepoName
} = Fixtures;

describe(`DataStore Tests`, function() {

  let callBackFn = function callBackFn() {
    return true;
  };
  let fakeClient;

  beforeEach(function() {
    fakeClient = sinon.stub({
      child() {},
      set() {},
      remove() {}
    });
  });

  afterEach(function() {
    fakeClient.child.restore();
    fakeClient.set.restore();
    fakeClient.remove.restore();
  });

  describe(`Adding an issue works`, function() {

    const testIssueAddition = (childRefPath, issue) => {

      fakeClient.child.withArgs(childRefPath).returns(fakeClient);
      fakeClient.set.withArgs(issue, callBackFn).returns(null);

      let dataStore = new DataStore(fakeClient);
      const result = dataStore.addIssue(issue, callBackFn);

      fakeClient.child.calledWith(childRefPath);
      fakeClient.set.calledWith(issue, callBackFn);
      assert.ok(result, 'Entry was added');

    };

    it(`when the repo name is normal`, function() {
      testIssueAddition('issues/emberjs/api-docs/1', issueForPayloadWithNormalRepoName);
    });


    it(`when the repo name has a period in it`, function() {
      testIssueAddition('issues/emberjs/emberjs/1', issueForPayloadWithSplRepoName);
    });

  });

  describe(`Removing an issue works`, function() {

    const testIssueRemoval = (childRefPath, issue) => {

      fakeClient.child.withArgs(childRefPath).returns(fakeClient);
      fakeClient.remove.withArgs(callBackFn).returns(null);

      let dataStore = new DataStore(fakeClient);
      const result = dataStore.removeIssue(issue, callBackFn);

      fakeClient.child.calledWith(childRefPath);
      fakeClient.remove.calledWith(callBackFn);
      assert.ok(result, 'Entry was added');

    };
    it(`when the repo name is normal`, function() {
      testIssueRemoval('issues/emberjs/api-docs/1', issueForPayloadWithNormalRepoName);
    });


    it(`when the repo name has a period in it`, function() {
      testIssueRemoval('issues/emberjs/emberjs/1', issueForPayloadWithSplRepoName);
    });

  });

});
