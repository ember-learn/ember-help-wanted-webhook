import assert from 'assert';
import sinon from 'sinon';
import Promise from 'bluebird';

import Fixtures from '../fixtures';
import DataStore from '../../src/lib/data-store';

const {
  issueWithReqLabels
} = Fixtures;

describe(`DataStore Tests`, function() {

  let baseIssue;

  let callBackFn = function callBackFn() {
    return true;
  };
  let fakeClient;
  let dataStore;
  let expiresTime;

  beforeEach(function() {
    fakeClient = sinon.stub({
      bulkAsync() {},
      destroyAsync() {},
      getAsync() {},
      insertAsync() {},
    });
    dataStore = new DataStore(fakeClient);
    baseIssue = JSON.parse(JSON.stringify(issueWithReqLabels));
  });

  afterEach(function() {
    fakeClient.bulkAsync.restore();
    fakeClient.destroyAsync.restore();
    fakeClient.getAsync.restore();
    fakeClient.insertAsync.restore();
  });

  const testIssueBulkAddition = (issues, done) => {
    fakeClient.bulkAsync.withArgs(issues).returns(Promise.resolve(issues));

    dataStore.bulkAdd(issues).then(function() {
      assert.ok(fakeClient.bulkAsync.calledWith(issues));
      assert.ok(true, 'Entries was added');
      done();
    });
  };

  describe(`Bulk adding an issue works`, function() {

    it(`when the repo name is normal`, function(done) {
      testIssueBulkAddition([baseIssue], done);
    });

  });

  const testIssueAddition = (issue, done) => {
    fakeClient.insertAsync.withArgs(issue).returns(Promise.resolve(issue));

    dataStore.addIssue(issue).then(function() {
      assert.ok(fakeClient.insertAsync.calledWith(issue));
      assert.ok(true, 'Entry was added');
      done();
    });
  };

  describe(`Adding an issue works`, function() {

    it(`when the repo name is normal`, function(done) {
      testIssueAddition(baseIssue, done);
    });

  });

  const testIssueUpdate = (issue, done, doesIssueExist=true) => {
    let updatedIssue = issue;
    if (doesIssueExist) {
      updatedIssue._rev = 'something';
    }

    fakeClient.getAsync.withArgs(issue._id).returns(doesIssueExist ? Promise.resolve(updatedIssue): Promise.reject({}));
    fakeClient.insertAsync.withArgs(updatedIssue).returns(Promise.resolve(updatedIssue));

    dataStore.updateIssue(issue).then(function() {
      assert.ok(fakeClient.insertAsync.calledWith(updatedIssue));
      assert.ok(fakeClient.getAsync.calledWith(issue._id));
      done();
    });
  };

  describe(`Updating an issue`, function() {

    it(`when issue exists`, function(done) {
      testIssueUpdate(baseIssue, done);
    });


    it(`when issue doesn't exist`, function(done) {
      testIssueUpdate(baseIssue, done, false);
    });

  });

  const testIssueRemoval = (issue, done, doesIssueExist=true) => {
    let issueFromStore = issue;
    issueFromStore._rev = 'something';
    const valToReturn = doesIssueExist ? Promise.resolve(issueFromStore) : Promise.reject({error: 'error'});
    fakeClient.getAsync.withArgs(issue._id).returns(valToReturn);

    let issueToDelete = issue;
    issueToDelete._deleted = true;
    if (doesIssueExist) {
      fakeClient.destroyAsync.withArgs(issue).returns(Promise.resolve(issue));
    }

    dataStore.removeIssue(issue).then(function() {
      assert.ok(fakeClient.getAsync.calledWith(issue._id));
      assert.ok(fakeClient.destroyAsync.calledWith(issueToDelete));
      done();
    }, function(err) {
      if (!doesIssueExist) {
        done();
      }
    })
  };

  describe(`Deleting an issue`, function() {

    it(`when issue exists`, function(done) {
      testIssueRemoval(baseIssue, done);
    });


    it(`when issue doesn't exist`, function(done) {
      testIssueRemoval(baseIssue, done, false);
    });

  });

});
