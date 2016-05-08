/**
 * Created by dbaker on 5/2/16.
 */
export default class DataStore {

  constructor(client) {
    this.client = client;
  }

  addIssue(issue) {
    const issueRef = this._getStoreReference(issue);
    issueRef.set(issue, function(error) {
      if (error) {
        console.log('failures' + error);
        return false;
      }
      return true;
    });

    return true;
  }

  removeIssue(issue) {
    const issueRef = this._getStoreReference(issue);
    issueRef.remove(function(error) {
      if (error) {
        console.log('failures' + error);
        return false;
      }
      return true;
    });

    return true;
  }

  _modifyRepoNameIfNeeded(repo) {
    return repo.replace('.', '');
  }

  _getStoreReference(issue) {
    let {
      repo:repoName,
      id:issueId
    } = issue;

    repoName = this._modifyRepoNameIfNeeded(repoName);

    const path = `issues/${repoName}/${issueId}`;
    return this.client.child(path);
  }

};
