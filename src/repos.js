// NOTE: Ensure the labels are in lower case to make it easier for repo owners
const standardLabels = [
  'bug',
  'help wanted',
];

let repoList = [
  'ember-learn/ember-help-wanted',
  'ember-learn/ember-help-wanted-webhook',
  'emberjs/guides',
  'emberjs/website',
  'emberjs/ember.js',
  'ember-cli/ember-cli',
];

let repoHash = {};

repoList.map(repo => {
  repoHash[repo] = { labels: standardLabels };
});

export default repoHash;
