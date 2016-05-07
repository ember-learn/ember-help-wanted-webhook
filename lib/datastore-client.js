/**
 * Created by dbaker on 5/2/16.
 */
var firebase = require("firebase");

function DataStore(host) {
  this.host = host;
}

DataStore.prototype.addIssue = function(repo, issueId, payload) {
  var ref = this._setupFirebase(this.host);
  //ref.authWithCustomToken(AUTH_TOKEN, function(error, authData) {

  repo = this._modifyRepoNameIfNeeded(repo);
  var path = 'issues/' + repo + '/' + issueId
  var issueRef = this._getStoreReference(ref, path);
  issueRef.set(payload, function(error) {
    if (error) {
      console.log('failures' + error);
      return false;
    }
    return true;
  });

  return true;
};

DataStore.prototype._setupFirebase = function(host) {
  return new firebase(host);
};

DataStore.prototype._modifyRepoNameIfNeeded = function(repo) {
  return repo.replace('.', '');
};

DataStore.prototype._getStoreReference = function(ref, path) {
  return ref.child(path);
};

module.exports = DataStore;