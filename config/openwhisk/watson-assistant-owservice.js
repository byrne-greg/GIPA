/*
 * Licensed Materials - Property of IBM
 *
 * Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/**
 * Calls the Watson Assistant (Conversation) service and returns a conversation context.
 * @param {Object} params The parameters
 * @param {String} params.WATSON_ASSISTANT_USERNAME The username for the Conversation service.
 * @param {String} params.WATSON_ASSISTANT_PASSWORD The password for the Conversation service.
 * @param {String} params.WATSON_ASSISTANT_WORKSPACE_ID The workspace id for the Conversation workspace.
 * @param {String} params.WATSON_ASSISTANT_VERSION The version date for the Conversation service.
 * @param {Object} params.conversation The conversation object.
 * @param {Object} params.conversation.input The user's input message.
 */
const assert = require('assert');
const watson = require('watson-developer-cloud');
const request = require('request');

function main(params) {
    const assistantPromise =  promiseToConverseToAssistant(params);
    const returnPromise = assistantPromise.then(async function onFulfilled(result) {

        if(result.conversation.actions) {
            var actionResult = await resolveConversationActions(result.conversation.actions);
            // var actionResult = (await promiseToGetJoke()).joke;
            result.conversation.context.random_joke = actionResult;
            params.conversation = result.conversation;
            result = await promiseToConverseToAssistant(params).then(function onFulfilled(result){ return result;} );
            // result.conversation.output.text[0] = actionResult;
        } 

        return result;
    });

    return returnPromise;
}

async function resolveConversationActions(actions) {
    switch(actions[0].name) {
        case "getRandomJoke": return (await promiseToGetJoke()).joke;
        default: return "Hmmmm, I seem to have misplaced the result of an action";
    }
}

function promiseToConverseToAssistant(params) {
   return new Promise(function (resolve, reject) {
        assert(params, 'params can not be null');
        assert(params.WATSON_ASSISTANT_USERNAME, 'params.WATSON_ASSISTANT_USERNAME can not be null');
        assert(params.WATSON_ASSISTANT_PASSWORD, 'params.WATSON_ASSISTANT_PASSWORD can not be null');
        assert(params.WATSON_ASSISTANT_VERSION, 'params.WATSON_ASSISTANT_VERSION can not be null');
        assert(params.WATSON_ASSISTANT_WORKSPACE_ID, 'params.WATSON_ASSISTANT_WORKSPACE_ID can not be null');
    
        var assistant = new watson.AssistantV1({
            username: params.WATSON_ASSISTANT_USERNAME,
            password: params.WATSON_ASSISTANT_PASSWORD,
            version: params.WATSON_ASSISTANT_VERSION
        });

        var context = (params.conversation && params.conversation.context ? params.conversation.context : {});
        var input = (params.conversation && params.conversation.input ? params.conversation.input : {text: 'joke'});
        assistant.message({
            workspace_id: params.WATSON_ASSISTANT_WORKSPACE_ID,
            input: input,
            context,
            }, function (err, response) {
            if (err) {
                return reject(err);
            } else {
                const output = Object.assign({}, {
                conversation: response
                });
                return resolve(output);
            }
        });
    });
}

function promiseToGetJoke() {
     return new Promise(function (resolve,reject) { 
        var options = {
            url: 'https://icanhazdadjoke.com/',
            headers: {
            Accept: "text/plain"
            }
        };
        
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                return resolve({joke: body});
            } 
            else {
                return reject({joke:"I don't know any jokes right now; Sorry!"});
            }
        });
    });
}
module.exports.main = main;
