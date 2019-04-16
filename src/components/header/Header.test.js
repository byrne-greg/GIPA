import React from "react";
import Header, {HeaderTitleContainer, RobotImage, HeaderTitleText, HeaderSubTitle, HeaderTitleChar, IconLink } from "./Header";
import renderer from "react-test-renderer";
import {shallow, mount} from "enzyme";

describe("Header component", () => {
 
	it("shallow renders without crashing", () => {
		shallow(<Header/>);
	});
  
	it("shallow renders with the correct number/type of children components", () => {
		var wrapper = shallow(<Header/>);
		expect(wrapper.find(HeaderTitleContainer).length).toBe(1);
		expect(wrapper.find(HeaderSubTitle).length).toBe(1);
	});

	it("full render matches expected snapshot", () => {
		const header = renderer.create(<Header/>).toJSON();
		expect(header).toMatchSnapshot();
	});
});

describe("HeaderTitleContainer functional component", () => {

	it("shallow renders without crashing", () => {
		shallow(<HeaderTitleContainer/>);
    
	});

	it("shallow renders with the correct number/type of children components", () => {
		var wrapper = shallow(<HeaderTitleContainer/>);
		expect(wrapper.find(RobotImage).length).toBe(2);
		expect(wrapper.find(HeaderTitleText).length).toBe(1);
	});

	it("shallow renders and passes the correct prop format to HeaderTitleText", () => {
		var wrapper = shallow(<HeaderTitleContainer title="test"/>);
		expect(wrapper.find(HeaderTitleText).prop("titlechars")).toEqual(["t","e","s","t"]);
	});

	it("shallow renders and passes the correct default prop format to HeaderTitleText", () => {
		var wrapper = shallow(<HeaderTitleContainer/>);
		expect(wrapper.find(HeaderTitleText).prop("titlechars")).toEqual(["G","I","P","A"]);
	});

});

describe("RobotImage functional component", () => {

	it("shallow renders without crashing", () => {
		shallow(<RobotImage/>);
	});

});

describe("HeaderTitleText functional component", () => {

	it("shallow renders without crashing", () => {
		shallow(<HeaderTitleText/>);
	});

	it("renders with correct amount of children per prop", () => {
		var wrapper = mount(<HeaderTitleText titlechars={["1","2"]}/>);
		expect(wrapper.find(HeaderTitleChar).length).toBe(2);
	});

	it("renders with correct amount of children per default prop", () => {
		var wrapper = mount(<HeaderTitleText />);
		expect(wrapper.find(HeaderTitleChar).length).toBe(4);
	});

});

describe("HeaderTitleChar functional component", () => {

	it("shallow renders without crashing without prop", () => {
		shallow(<HeaderTitleChar />);
	});

	it("shallow renders without crashing with prop", () => {
		shallow(<HeaderTitleChar char="c" />);
	});

});

describe("HeaderSubTitle functional component", () => {

	it("shallow renders without crashing", () => {
		shallow(<HeaderSubTitle/>);
	});

	it("shallow renders with default subtitle prop", () => {
		var wrapper = shallow(<HeaderSubTitle/>);
		expect(wrapper.find(".HeaderSubTitle_title").text()).toEqual("By Greg Byrne");
	});

	it("shallow renders with subtitle prop", () => {
		var wrapper = shallow(<HeaderSubTitle subTitle="test"/>);
		expect(wrapper.find(".HeaderSubTitle_title").text()).toEqual("test");
	});

	it("shallow renders with correct number of IconLink components", () => {
		var wrapper = shallow(<HeaderSubTitle/>);
		expect(wrapper.find(IconLink).length).toBe(3);
	});

});

describe("IconLink functional component", () => {

	it("shallow renders without crashing", () => {
		shallow(<IconLink/>);
	});

	it("shallow renders with correct props", () => {
		var wrapper = shallow(<IconLink href="test href" screenReaderText="test screenReaderText" iconClassName="test iconClassName"/>);
		expect(wrapper.find("a").prop("href")).toEqual("test href");
		expect(wrapper.find(".hidden").text()).toEqual("test screenReaderText");
		expect(wrapper.find("a").prop("className")).toEqual("test iconClassName");
	});

});
