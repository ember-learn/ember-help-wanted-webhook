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
    logger.debug(`adding {issue._id} in store`);
    return this._client.insertAsync(issue);
  }

  updateIssue(issue) {
    return this._getStoreReference(issue).then((issueFromStore) => {
      logger.debug(`updating ${issue._id} in store`);
      let updatedIssue = issue;
      updatedIssue._rev = issueFromStore._rev;
      return this._client.insertAsync(updatedIssue);
    }, () => {
      logger.debug(`adding {issue._id} in store`);
      return this._client.insertAsync(issue);
    });
  }

  removeIssue(issue) {
    return this._getStoreReference(issue).then(issueFromStore => {
      logger.debug(`deleting ${issue._id} from store`);
      let issueToDelete = issue;
      issueToDelete._rev = issueFromStore._rev;
      return this._client.destroyAsync(issueToDelete._id, issueFromStore._rev);
    }, (err) => {
      return Promise.reject(`Issue doesnt exist ${err}`);
    });
  }

  _getStoreReference(issue) {
    return this._client.getAsync(issue._id);
  }

};
