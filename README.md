# GIPA
## Greg's Interactive Personal Advocate
[![Build Status](https://travis-ci.org/byrne-greg/GIPA.svg?branch=master)](https://travis-ci.org/byrne-greg/GIPA)
[![Coverage Status](https://coveralls.io/repos/github/byrne-greg/GIPA/badge.svg?branch=master)](https://coveralls.io/github/byrne-greg/GIPA?branch=master)

## Mission
Provide a portal where inquiring users can ask personal questions of it's creator from a responsive conversational agent

## Personal Agenda
To gain practical experience in using a variety of hitherto unfamiliar technologies

## Demo
See https://gregbyrne.eu-gb.mybluemix.net/

## Technologies Used
* [ReactJS](https://reactjs.org/) _( i love it )_
  * Jest and Enzyme for testing
* [NodeJS](https://nodejs.org/en/)
* [IBM Watson Assistant](https://www.ibm.com/watson/ai-assistant/) service 
* [OpenWhisk](https://openwhisk.apache.org/) / [IBM Cloud Functions](https://console.bluemix.net/openwhisk/)
* [IBM Cloud](https://www.ibm.com/cloud/)
* [Travis CI](https://travis-ci.org/)
* [Coveralls](https://coveralls.io/)
* Git _(obviously!)_

## Setup Locally
1. Clone this repo to a local dir (henceforth known as _ROOT_DIR_ )
1. In _ROOT_DIR_, execute `npm i` (or if you like longhand; `npm install`)
1. [Create your IBM Cloud account](https://www.ibm.com/cloud/), if you don't have one already.
1. [Create you IBM Watson Assistant service instance](https://console.bluemix.net/catalog/services/conversation), if you don't have one already.
1. Import the ready-made workspace into Watson Assistant from `ROOT_DIR/config/watson-assistant-workspace/watson-assistant-workspace.json`
1. Open `ROOT_DIR/config/watson-assistant-config.json`
1. Enter your Watson Assistant credentials in fields required; Service instance Username & Password, conversation workspace identifier, and update the version date if required.
1. Create your IBM cloud function: _(I use the IBM Cloud developer tools but this can be performed via the UI)_
    1. Login
      * `ibmcloud login`, `ibmcloud target --cf`
    1. Create the cloud function
      * `ibmcloud wsk action create conversation ROOT_DIR/config/openwhisk/watson-assistant-owservice.js --kind nodejs:8 --web true`
        * Note: Minimum NodeJS 8 runtime required which at time of writing is not the default
    1. Update the cloud function with the Watson Assistant params
      * `ibmcloud wsk action update coversation --param-file ROOT_DIR/config/watson-assistant-config.json`
1. Create the API for the function
    * With the OpenWhisk function created, we can now create a managed API around that function which can be called from the application.
      1. Navigate to https://console.bluemix.net/openwhisk/apimanagement and click _Create Managed API_
      1. Under _API Basics_, enter a description and API base path
      1. Click _Create Operation_
        1. Add a path to the operation.
        1. Change the verb to POST
        1. Select the action to `conversation` (or whatever you had named your OpenWhisk action)
        1. Ensure response type is `application/json`
      1. Activate the _Enable CORS_ toggle
      1. Click _Save and Expose_
    * When the API is created, you will see the API path for your API gateway. Append to your displayed API path, the path you defined when configuring the operation on the API, to have the path to the conversation FaaS.
1. Open `ROOT_DIR/.env` and add the path to the conversation FaaS to the `REACT_APP_OPENWHISK_ENDPOINT` variable
1. Test by running from _ROOT_DIR_ `npm start`

### Post-Setup Steps
1. Configure your repo to work with Travis CI and Coveralls using the existing `.travis.env` and `package.json` scripts.
1. Configure your repo to auto-deploy
