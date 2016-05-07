/* jshint node: true */

export default class IssueHandler {

  constructor(dataStoreClient, repos) {
    this.dataStoreClient = dataStoreClient;
    this.watching =  repos;
  }

  label(event) {
    debugger;
    const results = this._hasOneOfDesiredLabels(event.payload);
    if (!results) {
      return false;
    }

    const issueHash = this._constructIssueHash(event.payload);
    return this._addIssueToDatastore(issueHash);
  }

  unlabeled(event) {

    if (this._removedOneOfDesiredLabels(event.payload)) {

      var issue = this._constructIssueHash(event.payload);

      // remove the issue from the Help Wanted system
      return this._removeIssueFromDatastore(issue);
    }
  }

  closed(event) {

    if (this._hasOneOfDesiredLabels(event.payload)) {

      // remove the issue from the Help Wanted system

      this._removeIssueFromDatastore(repoName, issueId);

    }
  }

  reopened(event) {

    // make sure the re-opened issue has one of our key labels, then
    if (this._hasOneOfDesiredLabels(event.payload)) {

      // add the issue to Firebase again
    }
  }

    /**
  *
  * @param internalIssueHash
  * @returns {boolean}
  */
  _addIssueToDatastore(internalIssueHash) {
    // send our issue hash to Firebase (not the original Github issue)
    return this.dataStoreClient.addIssue(internalIssueHash);
  }

    /**
  *
  * @param internalIssueHash
  * @returns {boolean}
  */
  _removeIssueFromDatastore(internalIssueHash) {

    // clean things up on Firebase
    return this.dataStoreClient.removeIssue(internalIssueHash.repo, internalIssueHash.id, internalIssueHash);
  }

    /**
  * Whether our issue has one of the desired labels for this repo
  *
  * @param payload
  * @returns {boolean}
  */
  _hasOneOfDesiredLabels(payload) {

    const watchedRepo = this.watching[payload.repository.full_name];

    if( typeof watchedRepo !== 'undefined' ) {

      var result = payload.issue.labels.filter(function(label) {
        return watchedRepo.labels.indexOf(label.name) !== -1;
      });

      return ( result.length );
    }

    return false;
  }

    /**
  * Whether our issue has one of our watched labels
  *
  * @param payload
  * @returns {boolean}
  */
  _removedOneOfDesiredLabels(payload) {
    return true;
  }

  _constructIssueHash(payload) {

    return {
      id: payload.issue.number,
      url: payload.issue.html_url,
      title: payload.issue.title,
      labels: payload.issue.labels,
      repo: payload.repository.full_name,
      repoUrl: payload.repository.html_url
    };

  }

};
