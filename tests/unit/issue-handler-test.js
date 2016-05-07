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
  var storeStub;

  beforeEach(function() {
    let dummyStore = {
      create(issue) {},
    };
    storeStub = sinon.stub(dummyStore);
    issueHandler = new IssueHandler(storeStub, repos);
  });

  describe(`Create a new issue`, function() {
    it(`requests store to create a new issue`, function() {
      assert.ok(issueHandler.create(labeledPayload), 'Record is created');
      storeStub.calledWith(labeledIssue);
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
