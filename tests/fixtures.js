const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const basePayload = {
  "action": "labeled",
  "issue": {
    "id": 153841776,
    "number": 1,
    "title": "test1",
    "user": {
      "login": "sivakumar-kailasam",
      "id": 604117,
      "avatar_url": "https://avatars.githubusercontent.com/u/604117?v=3",
      "gravatar_id": "",
      "site_admin": false
    },
    "labels": [{
      "url": "https://api.github.com/repos/emberjs-blr/github-webhook-test-repo/labels/bug",
      "name": "bug",
      "color": "ee0701"
    }],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2016-05-09T18:41:47Z",
    "updated_at": "2016-05-09T18:41:47Z",
    "closed_at": null,
    "body": ""
  },
  "label": {
    "url": "https://api.github.com/repos/emberjs-blr/github-webhook-test-repo/labels/bug",
    "name": "bug",
    "color": "ee0701"
  },
  "repository": {
    "id": 58398124,
    "name": "github-webhook-test-repo",
    "full_name": "emberjs-blr/github-webhook-test-repo",
    "owner": {
      "login": "emberjs-blr",
      "id": 10388269,
      "avatar_url": "https://avatars.githubusercontent.com/u/10388269?v=3",
      "gravatar_id": "",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "description": "",
    "fork": false,
  }
};

const baseIssue = {
  _id: "issue_153841776",
  data: {
    _id: "issue_153841776",
    number: 1,
    title: "test1",
    labels: [
      {
        "name": "bug",
        "color": "ee0701"
      }
    ],
    repo: "github-webhook-test-repo",
    org: "emberjs-blr",
    state: "open",
    createdAt: "2016-05-09T18:41:47Z",
    updatedAt: "2016-05-09T18:41:47Z"
  }
};

export default {

  issueWithReqLabels: baseIssue,

  payloadWithReqLabels: basePayload,

  issueWithoutReqLabels: (function() {
    let issue = cloneObject(baseIssue);
    issue.data.labels[0] = {
      name: 'i18n',
      color: '84b6eb'
    };
    return issue;
  }()),

  payloadWithoutReqLabels: (function() {
    let payload = cloneObject(basePayload);
    let unrecognizedLabel = {
      name: "i18n",
      color: "84b6eb"
    };
    payload.issue.labels[0] = unrecognizedLabel;
    payload.label = unrecognizedLabel;
    return payload;
  }()),

  issueWithNoLabels: (function() {
    let issue = cloneObject(baseIssue);
    issue.data.labels = [];
    return issue;
  }()),

  payloadWithNoLabels: (function() {
    let payload = cloneObject(basePayload);
    payload.issue.labels = [];
    return payload;
  }())

}
