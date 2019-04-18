import "./InfoPane.css";
import React from "react";
import PropTypes from "prop-types";

export default class InfoPane extends React.Component {
	constructor(props) {
		super(props);

		this.state = { isShowingInfoPaneOverlay: false };

		this.setIsShowingInfoPaneOverlay = this.setIsShowingInfoPaneOverlay.bind(
			this
		);
	}

	setIsShowingInfoPaneOverlay() {
		let prevState = this.state.isShowingInfoPaneOverlay;
		this.setState({ isShowingInfoPaneOverlay: !prevState });
	}

	determineDisplayStyle() {
		if (this.state.isShowingInfoPaneOverlay) {
			return "block";
		}
		return "none";
	}

	render() {
		return (
			<div className="InfoPane">
				<button
					className="InfoPane__overlayOpenButton"
					onClick={this.setIsShowingInfoPaneOverlay}
				>
					<i className="fas fa-info-circle" />
				</button>
				<div
					className="InfoPane__overlay"
					style={{ display: this.determineDisplayStyle() }}
				>
					<InfoPaneContent />
					<div
						className="InfoPane__suggestedResponse"
						onClick={this.setIsShowingInfoPaneOverlay}
					>
						{this.props.children}
					</div>
					<CloseButton closeOverlayFunc={this.setIsShowingInfoPaneOverlay} />
				</div>
			</div>
		);
	}
}

export const InfoPaneContent = props => {
	return (
		<div className="Card__content">
			<h2 className="Card__title">Greg's Interactive Personal Advocate</h2>
			<div className="Card__body">
				<p>
					GIPA was created as a personal project. The idea was to devise a way
					in which inquiring users could ask any questions they want to find out
					more about me. It's real mission was a self-learning practical
					exercise in using a wide variety of unfamiliar technologies and
					experimenting with my favourite topic at present time of writing -
					Chatbots!. Read about it's{" "}
					<a
						href="https://medium.com/@byrne.greg/a-development-story-in-creating-a-digital-advocate-with-watson-assistant-1623b824ec34"
						target="_blank"
						rel="noopener noreferrer"
					>
						development story
					</a>{" "}
					or visit the{" "}
					<a
						href="https://github.com/byrne-greg/GIPA"
						target="_blank"
						rel="noopener noreferrer"
					>
						code repository
					</a>
					.
				</p>
				<p>
					GIPA uses a bunch of technologies. The front-end was developed with{" "}
					<a
						href="https://reactjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						ReactJS
					</a>{" "}
					(and typical CSS/HTML). The conversational agent was created using the{" "}
					<a
						href="https://www.ibm.com/watson/ai-assistant/"
						target="_blank"
						rel="noopener noreferrer"
					>
						IBM's Watson Assistant
					</a>{" "}
					platform. The connectivity between the front-end and Watson Assistant
					uses the{" "}
					<a
						href="https://samnewman.io/patterns/architectural/bff/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Backend for Frontend
					</a>{" "}
					pattern. It is deployed using a{" "}
					<a
						href="https://nodejs.org/en/"
						target="_blank"
						rel="noopener noreferrer"
					>
						NodeJS
					</a>{" "}
					FaaS with{" "}
					<a
						href="https://openwhisk.apache.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Apache OpenWhisk
					</a>
					. The Backend for Frontend FaaS and the static front-end content is
					all hosted on{" "}
					<a
						href="https://www.ibm.com/cloud/"
						target="_blank"
						rel="noopener noreferrer"
					>
						IBM Cloud
					</a>{" "}
					(formerly Bluemix). The VCS uses{" "}
					<a
						href="https://github.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>{" "}
					and the build toolchain uses{" "}
					<a
						href="https://travis-ci.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Travis CI
					</a>{" "}
					and{" "}
					<a
						href="https://coveralls.io/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Coveralls
					</a>
					.
				</p>
				<p>
					For functionality, the responses are hard-coded within the Assistant
					workspace (due to the mostly static information about me). There is
					some dynamic content such as asking for a joke, which is a call-out to{" "}
					<a
						href="https://icanhazdadjoke.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						https://icanhazdadjoke.com/
					</a>{" "}
					to retrieve a random joke.
				</p>
				<p>Try ask GIPA questions in natural language about me.</p>
				<div>{props.children}</div>
			</div>
		</div>
	);
};

export const CloseButton = props => {
	return (
		<div className="CloseButton" onClick={props.closeOverlayFunc}>
			<i className="far fa-times-circle" />
		</div>
	);
};
CloseButton.propTypes = {
	closeOverlayFunc: PropTypes.func.isRequired
};
