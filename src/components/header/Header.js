import "./Header.css";
import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

export default class Header extends React.Component {
  // default state
  state = {
    title: "GIPA",
    subTitle: "By Greg Byrne"
  };

  render() {
    return (
        <header className="Header">
          <HeaderTitleContainer title={this.state.title}/>
          <HeaderSubTitle subTitle={this.state.subTitle}/>
        </header>
    );
  }
}

export const HeaderTitleContainer = (props) => {
  return(
    <div className="HeaderTitleContainer">
      <RobotImage/>
      <HeaderTitleText titlechars={props.title.split("")}/>
      <RobotImage/>
    </div>
  );
}
HeaderTitleContainer.propTypes = {
  title: PropTypes.string.isRequired
};
HeaderTitleContainer.defaultProps = {
  title: "GIPA"
};

export const RobotImage = () => {
  return(
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Robot.svg/1024px-Robot.svg.png" className="RobotImage" alt="Robot. Icon made by Freepik from www.flaticon.com " />
  );
}

export const HeaderTitleText = (props) => {
  return(
    <h1 className="HeaderTitleText">
      {props.titlechars.map(char => <HeaderTitleChar key={shortid.generate()} char={char}/>)}
    </h1>
  );
}
HeaderTitleText.propTypes = {
  titlechars: PropTypes.arrayOf(PropTypes.string.isRequired)
};
HeaderTitleText.defaultProps = {
  titlechars: ["G","I","P","A"]
};

export const HeaderTitleChar = (props) => {
  return(
    <div className="HeaderTitleChar">{props.char}</div>
  );
}
HeaderTitleChar.propTypes = {
  char: PropTypes.string
};

export const HeaderSubTitle = (props) => {
  return(
    <div className="HeaderSubTitle">
      <h3 className="HeaderSubTitle_title">{props.subTitle}</h3>
      <div className="HeaderSubTitle_iconLinks">
        <IconLink href="https://github.com/byrne-greg" iconClassName="fab fa-github" screenReaderText="Link: Greg Byrne Github Profile"/>
        <IconLink href="https://www.linkedin.com/in/byrne-greg/" iconClassName="fab fa-linkedin-in" screenReaderText="Link: Greg Byrne LinkedIn Profile"/>
        <IconLink href="https://www.facebook.com/greg.byrne.3551" iconClassName="fab fa-facebook-f" screenReaderText="Link: Greg Byrne Facebook Profile"/>
      </div>
    </div>
  );
}
HeaderSubTitle.propTypes = {
  subTitle: PropTypes.string
};
HeaderSubTitle.defaultProps = {
  subTitle: "By Greg Byrne"
};

export const IconLink = (props) => {
  return(
    <a href={props.href} target="_blank" rel="noopener noreferrer" className={props.iconClassName}><span className="hidden">{props.screenReaderText}</span></a>
  );
}
IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  screenReaderText: PropTypes.string.isRequired
};
IconLink.defaultProps = {
  href: "#",
  iconClassName: "far fa-frown",
  screenReaderText: "Default Icon Link"
};


