import React, {Component} from "react";
import Header from "./components/header/Header";
import ChatPanel from "./components/main-display/ChatPanel";
import "./App.css";


class App extends Component {
	render() {
		return (
			<div className="App">
				<VersionNumber/>
				<Header/>
				<ChatPanel/>
			</div>
		);
	}
}

export const VersionNumber = () => {
	return(
		<div className="VersionNumber">
			<p>v1.0.4</p>
		</div>
	);
};

export default App;
