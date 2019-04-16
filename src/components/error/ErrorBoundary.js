import React from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: "", errorInfo: "" };
	}
    
	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
	}
    
	render() {
		if (this.state.error || this.state.errorInfo) {
			// Error path
			return (
				<div className="errorMessageContainer">
					<h2 className="errorMessageTitle">
              How embarrassing, I just broke myself in front of you...  
						<i className="far fa-frown"></i>
					</h2>
					<div className="errorMessageText">
              
						<p>There is some things you can do:</p>
						<ul className="errorMessageTable">
							<li><p>Check your internet connection</p></li>
							<li><p>Try refresh your browser</p></li>
							<li><p>Try again later</p></li>
						</ul>
						<p>If the problem persists, please add an issue to it's Github repo and I will endeavour to fix it</p>
              
					</div>
					{/* // Get Stack trace */}
					{/* <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details> */}
				</div>
			);
		}
		// Normally, just render children
		return this.props.children;
	}  
}
export default ErrorBoundary;