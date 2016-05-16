import logger from './logger';
import FirebaseTokenGenerator from 'firebase-token-generator';
import Promise from 'bluebird';

const errPromise = function(err) {
  return Promise.reject(err);
};

/**
 * Created by dbaker on 5/2/16.
 */
export default class DataStore {

  constructor(client, firebaseSecret='', writeUserId='') {
    this._client = client;
    this._expiresTime = new Date();
    this._firebaseSecret = firebaseSecret;
    this._writeUserId = writeUserId;
  }

  bulkAdd(issues) {
    logger.debug(`No of issues to be added in bulk: ${issues.length}`);
    let promises = [];
    this._regenerateAuthIfNecessary().then(() => {
      Promise.mapSeries(issues, (issue) => {
        const issueRef = this._getStoreReference(issue);
        promises.push(this.client.set(issue));
      });
    });
    return Promise.all(promises);
  }

  addIssue(issue) {
    return this._regenerateAuthIfNecessary().then(() => {
      logger.debug('Adding issue', issue);
      const issueRef = this._getStoreReference(issue);
      return issueRef.set(issue);
    }, errPromise);
  }

  removeIssue(issue) {
    return this._regenerateAuthIfNecessary().then(() => {
      logger.debug('Remove issue', issue);
      const issueRef = this._getStoreReference(issue);
      return issueRef.set(issue);
    }, errPromise);
  }

  _regenerateAuthIfNecessary() {
    if (this._expiresTime > new Date()) {
      logger.debug('Token regeneration not required');
      return Promise.resolve();
    }

    const tokenGenerator = new FirebaseTokenGenerator(this._firebaseSecret);
    const token = tokenGenerator.createToken(
      { uid: this._writeUserId }
    );

    logger.debug('Generating a new token');

    return this._client.authWithCustomToken(token).then((authData) => {
      logger.info('Token regenerated');
      this._expiresTime = authData.expires;
      return Promise.resolve();
    }, function(error) {
      logger.error("Login Failed!", error);
      return Promise.reject(error);
    });
  }

  _getStoreReference(issue) {
    let {
      id:issueId
    } = issue;

    const path = `issues/${issueId}/githubData`;
    return this._client.child(path);
  }

};
