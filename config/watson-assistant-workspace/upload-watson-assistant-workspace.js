var watson = require('watson-developer-cloud');
var assistantParams = require("./../watson-assistant-config.json");
var workspace = require("./watson-assistant-workspace.json");

var assistant = new watson.AssistantV1({
  username: assistantParams.WATSON_ASSISTANT_USERNAME,
  password: assistantParams.WATSON_ASSISTANT_PASSWORD,
  version: assistantParams.WATSON_ASSISTANT_VERSION
});

assistant.updateWorkspace(workspace, function(err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log('SUCESS: Workspace upload complete');
  }
});
