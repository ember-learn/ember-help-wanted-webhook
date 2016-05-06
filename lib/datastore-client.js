/**
 * Created by dbaker on 5/2/16.
 */
var firebase = require("firebase");
var firebaseHost = process.env.FIREBASE_APP || '"https://<app-name>.firebaseio.com/";';

module.exports = {
  addIssue: function(repo, issueId, payload) {
    var ref = this._setupFirebase(firebaseHost);
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
//    return process.env['FIREBASE_SECRET'];
  },

  _setupFirebase: function(host) {
    return new firebase(host);
  },

  _modifyRepoNameIfNeeded: function(repo) {
    return repo.replace('.', '');
  },

  _getStoreReference: function(ref, path) {
    return ref.child(path);
  }
};