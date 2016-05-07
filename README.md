# ember-help-wanted-webhook
Used to populate our backend (currently Firebase) for the Ember Help Wanted app


### Development
- Use [ngrok](https://ngrok.com/) to create a tunnel to your machine that github can reach
- In your repo, go to *Settings* -> *Webhooks & services* -> Add webhook
  - Payload URL: __YourNGrokUrl__/issue-handler
  - Secret: oursecrethere
- To inspect payload visit http://127.0.0.1:4000

### References
https://github.com/rvagg/github-webhook-handler
