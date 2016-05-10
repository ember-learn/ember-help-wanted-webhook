/* jshint node: true */
import Promise from 'bluebird';


export default class IssueHandler {

  constructor(dataStoreClient, repos) {
    this.dataStoreClient = dataStoreClient;
    this.watching =  repos;
  }

  label(event) {
    if (!this._hasOneOfDesiredLabels(event)) {
      return Promise.reject(`Doesn't have a label we're monitoring`);
    }
    const issueHash = this._constructIssueHash(event);
    return this._addIssueToDatastore(issueHash);
  }

  unlabel(event) {
    const issue = this._constructIssueHash(event);
    if (this._hasOneOfDesiredLabels(event)) {
      return this._addIssueToDatastore(issue);
    } else {
      return this._removeIssueFromDatastore(issue);
    }
  }

  edit(event) {
    return this.label(event);
  }

  close(event) {
    const issueHash = this._constructIssueHash(event);
    return this._removeIssueFromDatastore(issueHash);
  }

  reopen(event) {
    return this.label(event);
  }

  _addIssueToDatastore(internalIssueHash) {
    // send our issue hash to Firebase (not the original Github issue)
    return this.dataStoreClient.addIssue(internalIssueHash);
  }

  _removeIssueFromDatastore(internalIssueHash) {
    // clean things up on Firebase
    return this.dataStoreClient.removeIssue(internalIssueHash);
  }

  _hasOneOfDesiredLabels({ payload }) {
    const watchedRepo = this.watching[payload.repository.full_name];

    if( typeof watchedRepo !== 'undefined' ) {
      var result = payload.issue.labels.filter(function(label) {
        return watchedRepo.labels.indexOf(label.name.toLowerCase()) !== -1;
      });

      return (result.length > 0);
    }

    return false;
  }

  _constructIssueHash({ payload }) {

    let labels = payload.issue.labels.map(label => {
      return {name: label.name, color: label.color}
    });

    return {
      id: payload.issue.id,
      number: payload.issue.number,
      title: payload.issue.title,
      labels,
      repo: payload.repository.name,
      org: payload.repository.owner.login,
      state: payload.issue.state,
      createdAt: payload.issue.created_at,
      updatedAt: payload.issue.updated_at,
    };

  }

};

