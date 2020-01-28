import "./ChatPanel.css";
import React from "react";
import ScrollingMessagesPane from "./ScrollingMessagesPane";
import ControlPane from "./ControlPane";
import ErrorBoundary from "../error/ErrorBoundary";

export default class ChatPanel extends React.Component {
  
	constructor(props) {
		super(props);

		this.state = {
			chatMessages: [],
			watsonContext: {},
			watsonResponseSuggestions: [],
			watsonApiUrl: process.env.REACT_APP_OPENWHISK_ENDPOINT
		};    
		this.handleEnteredMessage = this.handleEnteredMessage.bind(this);
	}

	async callWatson(message) {
		const requestJson = JSON.stringify({
			conversation: {
				input: {
					text: message
				},
				context: this.state.watsonContext
			}
		});
		return await fetch(this.state.watsonApiUrl,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: requestJson
			}
		).then((response) => {
			if(!response.ok) {
				throw response;
      }
			return(response.json());
		})
			.then((responseJson) => {
				this.handleResponse(responseJson);
			}).catch(function(error) {
				throw error;
			});
	}

	handleResponse(responseJson) {
    	// if responseJson is empty, handle with fallback
		if(Object.keys(responseJson).length === 0 && responseJson.constructor === Object) {
    	  this.createFallbackMessage();      
	  	} else {
			this.createMessage(responseJson);
			this.updateSuggestedResponse(responseJson);
		}
	}

	createMessage(responseJson) {
		const outputMessagesArr = responseJson.conversation.output.text;
		const outputContext = responseJson.conversation.context;
    
		for(var outputMessage of outputMessagesArr){
			const msgObj = {
				type: "bot",
				message: outputMessage
			};
      
			this.addMessageToState(msgObj);
		}
    
		this.setState({watsonContext: outputContext});
	}

	createFallbackMessage() {
		const msgObj = {
			type: "bot",
			message: "Oooh I do apologize, but I seem to be disconnected from the core Watson Assistant service. If this persists, please do raise a Github issue. How embarrassing..."
		};
    
		this.addMessageToState(msgObj);
	}

	updateSuggestedResponse(responseJson) {
		if(responseJson.conversation.output.nextResponseSuggestions && Array.isArray(responseJson.conversation.output.nextResponseSuggestions)) {
			this.setState({watsonResponseSuggestions: responseJson.conversation.output.nextResponseSuggestions});
		} else {
			this.setState({watsonResponseSuggestions: ["Let's talk about something else..."]});
		}

	}

	addMessageToState(msgObj) {
		this.setState({
			chatMessages: [ ...this.state.chatMessages , msgObj]
		});
	}

	prepareOutgoingMessage(messageText) {
		const inputMessage = messageText;
		if (inputMessage !== "") {
			const msgObj = {
				type: "user",
				message: inputMessage 
			};
			this.addMessageToState(msgObj);
			this.callWatson(inputMessage);
		}
	}

	handleEnteredMessage(input) {
		this.prepareOutgoingMessage(input);
	}
   
	componentDidMount() {
		this.callWatson("");
	}

	render() {
		return (      
			<div className="ChatPanel">
				<Disclaimer/>
				<ErrorBoundary>
					<WatsonIsDown/>
					{/* <ScrollingMessagesPane chatMessages={this.state.chatMessages}/> */}
					<ControlPane handleEnteredMessage={this.handleEnteredMessage} watsonResponseSuggestions={this.state.watsonResponseSuggestions}/>
				</ErrorBoundary>
			</div>
		);
	}
}

export const Disclaimer = () => {
	return(
		<div className="Disclaimer">
			<strong>Disclaimer: </strong>Please do not enter any personal information. Any personal information entered is understood as freely given. Data is stored in the IBM Cloud service and is only used for training purposes.
		</div>
	);
};

const WatsonIsDown = () => {
	return(
		<div className="WatsonDown">
			<strong>Due to a change in terms of service, the IBM Watson Assistant service used is no longer available</strong>
		</div>
	)
}




