import "./ScrollingMessagesPane.css";
import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

export default class ScrollingMessagesPane extends React.Component {
 
	componentDidUpdate() {
		this.scrollToBottom();
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		if(document.getElementById("latest-message") !== null) {
			document.getElementById("latest-message").scrollIntoView({ behavior: "smooth" });
		}
	}
    
	createMessage(msgObj) {
		let msgType = (msgObj.type === "user" ? "userMsg" : "botMsg");
		return (
			<Message key={shortid.generate()} text={msgObj.message} type={msgType}/>
		);     
	}

	displayMessages(messages) {
		if(messages && messages !== null && messages !== undefined) {
			return(
				messages.map(m => (this.createMessage(m))));
		} else {
			return( <h2>No Messages to Display</h2>);
		}
      
	}
    
	render() {
		return(
			<div className="ScrollingMessagesPane">
				{/* {this.props.chatMessages.map(m => (this.createMessage(m)))} */}
				{/* dummy div used to "scroll Into View" */}
				{this.displayMessages(this.props.chatMessages)}
				<div id="latest-message" style={{ float:"left", clear: "both" }}/> 
			</div>
		);
	}

}

export const Message = props => {
	return (
		<div className={"ScrollingMessagesPane__" + props.type}>
			<p>{props.text}</p>
		</div>
	);
};
Message.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

 