import "./ControlPane.css";
import React from "react";
import PropTypes from "prop-types";
import InfoPane from "./InfoPane";
import shortid from "shortid";

export default class ControlPane extends React.Component {
  
	constructor(props) {
		super(props);

		this.state = {inputValue: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputButton = this.handleInputButton.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
  
	enterMessage(messageInput) {
		this.props.handleEnteredMessage(messageInput);
		document.getElementById("inputField").value = "";
		this.setState({inputValue: ""});
	}
  
	handleKeyPress(event) {
		if (event.key === "Enter") {
			this.enterMessage(event.target.value);
		}
	}
 
	handleSubmit() {
		this.enterMessage(this.state.inputValue);    
	}

	handleInputButton(messageInput) {
		this.props.handleEnteredMessage(messageInput);

	}

	handleChange(event) {
		document.getElementById("inputField").scrollIntoView({ behavior: "smooth"});
		this.setState({inputValue: event.target.value});
	}

	render() {
		return (      
			<div className="ControlPane">
				<SuggestedResponsePane suggestedResponses={this.props.watsonResponseSuggestions} handleSubmit={this.handleInputButton}/>
				<div className="ControlPane__inputPane">
					<InputField handleChange={this.handleChange} handleKeyPress={this.handleKeyPress}/>
					<SubmitButton handleSubmit={this.handleSubmit} hasInputText={this.state.inputValue !== ""}/>
					<InfoPane>
						<SuggestedResponsePane suggestedResponses={["Tell me a joke", "Does Greg have friends?", "Do you have a partner", "What are Greg's kids?", "Where does he work?", "What is Greg"]} handleSubmit={this.handleInputButton}/>
					</InfoPane>
				</div>
			</div>
		);
	}
}
ControlPane.propTypes = {
	handleEnteredMessage: PropTypes.func.isRequired,
	watsonButtonSuggestions: PropTypes.arrayOf(PropTypes.string.isRequired)
};
ControlPane.defaultProps = {
	suggestedResponses: []
};

export const InputField = (props) => {
	return(
		<input 
			className="InputField"
			id="inputField" 
			type="text" placeholder="Ask me something..."
			onChange={props.handleChange}
			onKeyPress={props.handleKeyPress} 
		/>
	);
};
InputField.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleKeyPress: PropTypes.func.isRequired
};

export const SubmitButton = (props) => {
	return(
		<button className="SubmitButton" onClick={props.handleSubmit} style={props.hasInputText ? {opacity:1} : {opacity:0.5}}><i className="fas fa-comment"></i></button>
	);
};
SubmitButton.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	hasInputText: PropTypes.bool
};
SubmitButton.defaultProps = {
	hasInputText: false
};

export const InputButton = (props) => {
	return (      
		<button className="InputButton" onClick={() => props.handleSubmit(props.buttonText)}><p>{props.buttonText}</p></button>
	);
};
InputButton.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	buttonText: PropTypes.string
};
InputButton.defaultProps = {
	buttonText: "Hi"
};

export const SuggestedResponsePane = (props) => {
	return (
		<div className="SuggestedResponsePane">
			<div className="SuggestedResponsePane__title">
				<p>GIPA suggests asking:</p>
			</div>
			<div className="SuggestedResponsePane__responses">
				{props.suggestedResponses.map(response => (<InputButton key={shortid.generate()} handleSubmit={props.handleSubmit} buttonText={response}/>))}
			</div>
		</div>
	);
};
SuggestedResponsePane.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	suggestedResponses: PropTypes.arrayOf(PropTypes.string.isRequired),
};
SuggestedResponsePane.defaultProps = {
	suggestedResponses: []
};

