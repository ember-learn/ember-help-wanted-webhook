/**
 * Created by dbaker on 5/2/16.
 */
import firebase from "firebase";

export class FirebaseClient {

  constructor(firebaseHost) {
    this.client = this._setupFirebase(firebaseHost);
  }

  addIssue(issue) {
    var repo = issue.repo;
    var issueId = issue.id;
    var ref = this.client;
    //ref.authWithCustomToken(AUTH_TOKEN, function(error, authData) {

    repo = this._modifyRepoNameIfNeeded(repo);
    var path = 'issues/' + repo + '/' + issueId
    var issueRef = this._getStoreReference(ref, path);
    issueRef.set(issue, function(error) {
      if (error) {
        console.log('failures' + error);
        return false;
      }
      return true;
    });

    return true;
//    return process.env['FIREBASE_SECRET'];
  }

  _setupFirebase(host) {
    return new firebase(host);
  }

  _modifyRepoNameIfNeeded(repo) {
    return repo.replace('.', '');
  }

  _getStoreReference(ref, path) {
    return ref.child(path);
  }

};
