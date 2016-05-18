# ember-help-wanted-webhook
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[travis-badge]: https://img.shields.io/travis/ember-learn/ember-help-wanted-webhook/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/ember-learn/ember-help-wanted-webhook

Used to populate our backend (currently CouchDB) for the Ember Help Wanted app

### Couch setup
- The easiest way to setup couch is through docker, `docker run --name help-wanted-couchdb -p 5984:5984 -d couchdb`
- For alternate ways, refer to the [official installation docs](https://cwiki.apache.org/confluence/display/COUCHDB/Installing+CouchDB)
- Run `curl -X PUT http://127.0.0.1:5984/help-wanted` to create the db
- To populate the store run `npm run build && ./build/populate.js org/repoName`

### Development
- Use [ngrok](https://ngrok.com/) to create a tunnel to your machine that github can reach
- In your repo, go to *Settings* -> *Webhooks & services* -> Add webhook
  - Payload URL: __YourNGrokUrl__/issue-handler
  - Secret: oursecrethere
- To inspect payload visit http://127.0.0.1:4000
- To inspect logs run ./node_modules/.bin/bunyan logs/events.log


### References
https://github.com/rvagg/github-webhook-handler
