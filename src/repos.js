const standardLabels = [
  'Bug',
  'Help Wanted'
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
