/* jshint node: true */
/* jshint mocha: true */
'use strict';

import assert from 'assert';
import path from 'path';
import sinon from 'sinon';

import IssueHandler from '../../src/lib/issue-handler';
import unlabeledEvent from '../fixtures/unlabeled-event';
import {
  issue as labeledIssue,
  payload as labeledPayload
} from '../fixtures/labeled-event';
import repos from '../../src/repos';

describe(`Issue Handler Tests`, function() {

  var issueHandler;
  var store;

  beforeEach(function() {
      let dummyStore = {
        addIssue() {}
      };
      store = sinon.stub(dummyStore);
      issueHandler = new IssueHandler(store, repos);
  });

  afterEach(function() {
      store.addIssue.restore();
  });

  describe(`Adding a label to an issue`, function() {
    it(`it updates store`, function() {
      store.addIssue.withArgs(labeledIssue).returns(true);

      const result = issueHandler.label({ payload: labeledPayload });

      assert.ok(result, 'Record is saved');
      store.addIssue.calledWith(labeledIssue);
    });
  });

/*  describe('Adding a label to an issue', function() {*/
    //it('updates store', function() {
      //assert.ok(issueHandler.label);
    //});
  /*});*/

  //describe('removing a label removes it from our Firebase list', function() {
    //it('updates Firebase', function() {

      //var result = IssueHandler.issueUnlabeled(UnlabeledEvent);
      //assert.ok(false, 'Need to confirm that we send the right info to mocked Firebase function');
      //assert.ok(result, 'issue not properly removed');
    //});
  //});

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
