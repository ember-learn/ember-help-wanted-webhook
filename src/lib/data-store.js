import logger from './logger';
import Promise from 'bluebird';

const errPromise = function(err) {
  return Promise.reject(err);
};

/**
 * Created by dbaker on 5/2/16.
 */
export default class DataStore {

  constructor(client) {
    this._client = client;
  }

  bulkAdd(issues) {
    return this._client.bulkAsync({docs: issues});
  }

  addIssue(issue) {
    return this._client.insertAsync(issue);
  }

  updateIssue(issue) {
    return this._getStoreReference(issue).then((issueFromStore) => {
      let updatedIssue = issue;
      updatedIssue._rev = issueFromStore._rev;
      return this._client.insertAsync(updatedIssue);
    }, () => {
      return this._client.insertAsync(issue);
    });
  }

  removeIssue(issue) {
    return this._getStoreReference(issue).then(issueFromStore => {
      let issueToDelete = issue;
      issueToDelete._rev = issueFromStore._rev;
      issueToDelete._deleted = true;
      return this._client.destroyAsync(issueToDelete);
    }, (err) => {
      return Promise.reject(`Issue doesnt exist ${err}`);
    });
  }

  _getStoreReference(issue) {
    return this._client.getAsync(issue._id);
  }

};
