# ember-help-wanted-webhook
Used to populate our backend (currently Firebase) for the Ember Help Wanted app


### Development
- Set the environmental variables from the section below.
- Use [ngrok](https://ngrok.com/) to create a tunnel to your machine that github can reach
- In your repo, go to *Settings* -> *Webhooks & services* -> Add webhook
  - Payload URL: __YourNGrokUrl__/issue-handler
  - Secret: oursecrethere
- To inspect payload visit http://127.0.0.1:4000
- To inspect logs run ./node_modules/.bin/bunyan logs/events.log

### Environment variables to setup
```
export OPENSHIFT_NODEJS_IP="127.0.0.1"
export OPENSHIFT_NODEJS_PORT=8080
export FIREBASE_APP="https://help-wanted-dev.firebaseio.com"
export FIREBASE_SECRET="344SliTRyGVneG8QdRfCKRjF6wlkzFoHlpjNYHqY"
# Generate a unique <256 chars guid (http://new-guid.com/)
export FIREBASE_WRITE_USER_ID="aa254aa7-b7ef-4461-8f0c-ecc07f5be859"
export WEBHOOK_SECRET="oursecrethere"
```

### Firebase setup
- Set the security and rules to,
```
{
    "rules": {
        ".read": true,
        ".write": "auth != null && auth.uid == 'aa254aa7-b7ef-4461-8f0c-ecc07f5be859'"
    }
}
```

### References
https://github.com/rvagg/github-webhook-handler
