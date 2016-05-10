import {logger} from './logger';
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
      return Promise.resolve();
    }

    const tokenGenerator = new FirebaseTokenGenerator(this._firebaseSecret);
    const token = tokenGenerator.createToken(
      { uid: this._writeUserId }
    );

    return this._client.authWithCustomToken(token).then((authData) => {
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
