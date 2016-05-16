/* jshint node: true */
/* jshint mocha: true */
import assert from 'assert';
import sinon from 'sinon';
import Promise from 'bluebird';

import Fixtures from '../fixtures';
import DataStore from '../../src/lib/data-store';

const {
  issueForPayloadWithNormalRepoName,
  bulkIssuesStoreObj,
} = Fixtures;

describe(`DataStore Tests`, function() {

  const issueKey = 'issues/153841776/githubData';
  let callBackFn = function callBackFn() {
    return true;
  };
  let fakeClient;
let dataStore;
let expiresTime;

  beforeEach(function() {
    fakeClient = sinon.stub({
      child() {},
      set() {},
      remove() {},
      authWithCustomToken() {},
     });
    dataStore = new DataStore(fakeClient);
    expiresTime = new Date();
    expiresTime = expiresTime.setHours(expiresTime.getHours() +1);
    dataStore._expiresTime = expiresTime;
  });

  afterEach(function() {
    fakeClient.child.restore();
    fakeClient.set.restore();
    fakeClient.remove.restore();
    fakeClient.authWithCustomToken.restore();
  });

  const testIssueAddition = (childRefPath, issue, done, checkForTokenRegeneration=false) => {
      fakeClient.child.withArgs(childRefPath).returns(fakeClient);
      fakeClient.set.withArgs(issue).returns(Promise.resolve());

      if (checkForTokenRegeneration) {
        fakeClient.authWithCustomToken.returns(Promise.resolve({ auth: { expires: expiresTime } }));
      }

      dataStore.addIssue(issue).then(function() {
        assert.ok(fakeClient.child.calledWith(childRefPath));
        assert.ok(fakeClient.set.calledWith(issue));
        assert.ok(true, 'Entry was added');
        if (checkForTokenRegeneration) {
          assert.ok(fakeClient.authWithCustomToken.called);
        }
        done();
      });
    };

  const testIssueRemoval = (childRefPath, issue, done, checkForTokenRegeneration=false) => {
      fakeClient.child.withArgs(childRefPath).returns(fakeClient);
      fakeClient.set.withArgs(issue).returns(Promise.resolve());

      if (checkForTokenRegeneration) {
        fakeClient.authWithCustomToken.returns(Promise.resolve({ auth: { expires: expiresTime } }));
      }

      dataStore.removeIssue(issue).then(function() {
        assert.ok(fakeClient.child.calledWith(childRefPath));
        assert.ok(fakeClient.set.calledWith(issue));
        assert.ok(true, 'Entry was updated');
        if (checkForTokenRegeneration) {
          assert.ok(fakeClient.authWithCustomToken.called);
        }
        done();
      });
    };

  describe(`Adding an issue works`, function() {

    it(`when the repo name is normal`, function(done) {
      testIssueAddition(issueKey, issueForPayloadWithNormalRepoName, done);
    });

    it(`even when token has expired`, function(done) {
      dataStore._expiresTime = new Date();
      testIssueAddition(issueKey, issueForPayloadWithNormalRepoName, done, true);
    });

  });

  describe(`Removing an issue works`, function() {

    it(`when the repo name is normal`, function(done) {
      testIssueRemoval(issueKey, issueForPayloadWithNormalRepoName, done);
    });

    it(`even when token has expired`, function(done) {
      dataStore._expiresTime = new Date();
      testIssueRemoval(issueKey, issueForPayloadWithNormalRepoName, done, true);
    });

  });

  describe(`Bulk add works`, function() {
    it(`saves them in bulk`, function(done) {
      const issuePath = '/issues/143282771/githubData';
      fakeClient.authWithCustomToken.returns(Promise.resolve());
      fakeClient.child.withArgs(issuePath).returns(fakeClient);
      fakeClient.set.withArgs(bulkIssuesStoreObj[0]).returns(Promise.resolve());
      dataStore.bulkAdd(bulkIssuesStoreObj).then(function() {
        console.log(fakeClient.authWithCustomToken.args);
        assert.ok(fakeClient.authWithCustomToken.called);
        assert.ok(fakeClient.child.calledWith(issuePath));
        ssert.ok(fakeClient.set.calledWith(bulkIssuesStoreObj[0]));
        done();
      });

    });
  });

});
