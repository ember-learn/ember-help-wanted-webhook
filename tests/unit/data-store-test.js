/* jshint node: true */
/* jshint mocha: true */
import assert from 'assert';
import sinon from 'sinon';
import Promise from 'bluebird';

import Fixtures from '../fixtures';
import DataStore from '../../src/lib/data-store';

const {
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

const issueKey = 'issues/153841776/githubData';

  describe(`Adding an issue works`, function() {

    const testIssueAddition = (childRefPath, issue, done) => {
      fakeClient.child.withArgs(childRefPath).returns(fakeClient);
      fakeClient.set.withArgs(issue).returns(Promise.resolve());

      let dataStore = new DataStore(fakeClient);
      dataStore.addIssue(issue).then(function() {
        assert.ok(fakeClient.child.calledWith(childRefPath));
        assert.ok(fakeClient.set.calledWith(issue));
        assert.ok(true, 'Entry was added');
        done();
      });
    };

    it(`when the repo name is normal`, function(done) {
      testIssueAddition(issueKey, issueForPayloadWithNormalRepoName, done);
    });

  });

  describe(`Removing an issue works`, function() {

    const testIssueRemoval = (childRefPath, issue, done) => {
      fakeClient.child.withArgs(childRefPath).returns(fakeClient);
      fakeClient.remove.returns(Promise.resolve());

      let dataStore = new DataStore(fakeClient);
      dataStore.removeIssue(issue).then(function() {
        assert.ok(fakeClient.child.calledWith(childRefPath));
        assert.ok(fakeClient.remove.called, 'Firebase remove api was called');
        assert.ok(true, 'Entry was added');
        done();
      });
    };

    it(`when the repo name is normal`, function(done) {
      testIssueRemoval(issueKey, issueForPayloadWithNormalRepoName, done);
    });

  });

});
