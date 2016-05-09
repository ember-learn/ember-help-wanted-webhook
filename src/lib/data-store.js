import {logger} from './logger';

/**
 * Created by dbaker on 5/2/16.
 */
export default class DataStore {

  constructor(client) {
    this.client = client;
  }

  addIssue(issue) {
    logger.debug('Adding issue', issue);
    const issueRef = this._getStoreReference(issue);
    return issueRef.set(issue);
  }

  removeIssue(issue) {
    logger.debug('Remove issue', issue);
    const issueRef = this._getStoreReference(issue);
    return issueRef.remove();
  }

  _getStoreReference(issue) {
    let {
      id:issueId
    } = issue;

    const path = `issues/${issueId}/github_data`;
    return this.client.child(path);
  }

};
