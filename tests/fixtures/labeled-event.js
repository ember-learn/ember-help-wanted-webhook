import util from 'util';

export const issue = {
  id: 1,
  url: "https://github.com/emberjs/ember.js/issues/1",
  title: "Testing issue",
  labels: [
    {
      "url": "https://api.github.com/repos/emberjs/ember.js/labels/Needs%20Help",
      "name": "Needs Help",
      "color": "84b6eb"
    }
  ],
  repo: "emberjs/ember.js",
  repoUrl: "https://github.com/emberjs/ember.js",
};

export const payload = {
  "action": "labeled",
  "issue": {
    "html_url": "https://github.com/emberjs/ember.js/issues/1",
    "number": 1,
    "user": {
      "login": "acorncom",
      "id": 802505,
      "avatar_url": "https://avatars.githubusercontent.com/u/802505?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/acorncom",
      "html_url": "https://github.com/acorncom",
      "followers_url": "https://api.github.com/users/acorncom/followers",
      "following_url": "https://api.github.com/users/acorncom/following{/other_user}",
      "gists_url": "https://api.github.com/users/acorncom/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/acorncom/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/acorncom/subscriptions",
      "organizations_url": "https://api.github.com/users/acorncom/orgs",
      "repos_url": "https://api.github.com/users/acorncom/repos",
      "events_url": "https://api.github.com/users/acorncom/events{/privacy}",
      "received_events_url": "https://api.github.com/users/acorncom/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/emberjs/ember.js/labels/Needs%20Help",
        "name": "Needs Help",
        "color": "84b6eb"
      }
    ],
    "state": "open",
    "title": "Testing issue",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2016-04-23T20:27:21Z",
    "updated_at": "2016-04-23T21:35:03Z",
    "closed_at": null,
    "body": "Setting this up"
  },
  "label": {
    "url": "https://api.github.com/repos/acorncom/ember-hitlist-tester/labels/Help%20Wanted",
    "name": "Help Wanted",
    "color": "128A0C"
  },
  "repository": {
    "full_name": "emberjs/ember.js",
    "html_url": "https://github.com/emberjs/ember.js",
  }
};

export const payloadWithoutReqLabel = {
  "action": "labeled",
  "issue": {
    "html_url": "https://github.com/emberjs/ember.js/issues/1",
    "number": 1,
    "user": {
      "login": "acorncom",
      "id": 802505,
      "avatar_url": "https://avatars.githubusercontent.com/u/802505?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/acorncom",
      "html_url": "https://github.com/acorncom",
      "followers_url": "https://api.github.com/users/acorncom/followers",
      "following_url": "https://api.github.com/users/acorncom/following{/other_user}",
      "gists_url": "https://api.github.com/users/acorncom/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/acorncom/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/acorncom/subscriptions",
      "organizations_url": "https://api.github.com/users/acorncom/orgs",
      "repos_url": "https://api.github.com/users/acorncom/repos",
      "events_url": "https://api.github.com/users/acorncom/events{/privacy}",
      "received_events_url": "https://api.github.com/users/acorncom/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/emberjs/ember.js/labels/a11y",
        "name": "a11y",
        "color": "84b6eb"
      }
    ],
    "state": "open",
    "title": "Testing issue",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2016-04-23T20:27:21Z",
    "updated_at": "2016-04-23T21:35:03Z",
    "closed_at": null,
    "body": "Setting this up"
  },
  "label": {
    "url": "https://api.github.com/repos/acorncom/ember-hitlist-tester/labels/a11y",
    "name": "a11y",
    "color": "128A0C"
  },
  "repository": {
    "full_name": "emberjs/ember.js",
    "html_url": "https://github.com/emberjs/ember.js",
  }
};
