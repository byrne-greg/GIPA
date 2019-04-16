var watson = require('watson-developer-cloud');
var fs = require('fs');
var path = require('path');
var assistantParams = require("./../watson-assistant-config.json");

var assistant = new watson.AssistantV1({
  username: assistantParams.WATSON_ASSISTANT_USERNAME,
  password: assistantParams.WATSON_ASSISTANT_PASSWORD,
  version: assistantParams.WATSON_ASSISTANT_VERSION
});

var exportedWorkspaceParams = {
  workspace_id: assistantParams.WATSON_ASSISTANT_WORKSPACE_ID,
  export: true
};

assistant.getWorkspace(exportedWorkspaceParams, function(err, getWorkspaceResponse) {
  if (err) {
    console.error(err);
  } else {
    fs.writeFile(path.resolve(__dirname) + '/watson-assistant-workspace.json', JSON.stringify(getWorkspaceResponse), 'utf-8', function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log("SUCCESS: Workspace download complete" );
      }
    });
  }
});

