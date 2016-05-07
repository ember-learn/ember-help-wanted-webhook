/* jshint node: true */
/* jshint mocha: true */
import assert from 'assert';
import path from 'path';
import sinon from 'sinon';

import FirebaseClient from '../../src/lib/firebase-client';

describe('adding an issue works', function() {

  it('generates appropriate path for a normal repo name', function() {

    var clientStub = sinon.stub(DataStore, '_setupFirebase', fakeHost);
    var referenceStub = sinon.stub(DataStore, '_getStoreReference', fakeIssueRef);

    var result = DataStore.addIssue('ember-cli/ember-cli', 10, {name: 'fakeData'});

    clientStub.restore();
    referenceStub.restore();
    sinon.assert.calledWith(referenceStub, 'host-name', 'issues/ember-cli/ember-cli/10');

    assert.ok(result, 'issue not properly sent to client');
  });

  it('generates modified path if we have a period in the name', function() {

    var clientStub = sinon.stub(DataStore, '_setupFirebase', fakeHost);
    var referenceStub = sinon.stub(DataStore, '_getStoreReference', fakeIssueRef);

    var result = DataStore.addIssue('emberjs/ember.js', 10, {name: 'fakeData'});

    clientStub.restore();
    referenceStub.restore();
    sinon.assert.calledWith(referenceStub, 'host-name', 'issues/emberjs/emberjs/10');

    assert.ok(result, 'issue not properly sent to client');
  });
});

function fakeHost() {
  return 'host-name';
}

function fakeIssueRef() {
  return {
    set: sinon.stub().returns(true)
  }
}
