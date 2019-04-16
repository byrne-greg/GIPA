import React from "react";
import "./Page404.css";

export default class Page404 extends React.Component {
  
	render() {
		return (      
			<div className="UhOh">
				<img className="Catastrophe_image" src="http://newsader.com/wp-content/uploads/2016/02/nuclear.jpg"/>
				<div className="Catastrophe_text">
					<h1 className="Catastrophe_textTitle">404</h1>
					<p>
						Something catastrophic has happened...
					</p>
					<p>
						It seem's <a href="https://github.com/byrne-greg/GIPA" target="_blank" rel="noopener noreferrer">GIPA</a> cannot find it's page.
					</p>
					<p>
						Check outside your windows to ensure the world hasn't ended!<br/>
						If not, perform the following:
					</p>
				</div>
				<code className="WhatToDo">
					checkBackLater() == foundPage ? thenGreat() : raiseIssue();
				</code>
				
			</div>
		);
	}
}





