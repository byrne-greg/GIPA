import React from "react";
import ControlPane, {InputField, SubmitButton, InputButton, SuggestedResponsePane} from "./ControlPane.js";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";


describe("ControlPane component", () => {

	it("shallow renders without crashing", () => {
		shallow(<ControlPane handleEnteredMessage={() => {}}/>);
	});

	it("full render matches expected snapshot", () => {
		const controlPane = renderer.create(<ControlPane handleEnteredMessage={() => {}}/>).toJSON();
		expect(controlPane).toMatchSnapshot();
	});

});

describe("SubmitButton component", () => {

	it("shallow renders without crashing", () => {
		var wrapper = shallow(<SubmitButton handleSubmit={() => {}}/>);
		expect(wrapper.find("button").length).toBe(1);
	});

	it("shallow renders with default opacity", () => {
		var wrapper = shallow(<SubmitButton handleSubmit={() => {}}/>);    
		expect(wrapper.find("button").prop("style")).toEqual({opacity:0.5});
	});

	it("shallow renders with half opacity when no input text exists", () => {
		var wrapper = shallow(<SubmitButton handleSubmit={() => {}} hasInputText={false} />);    
		expect(wrapper.find("button").prop("style")).toEqual({opacity:0.5});
	});

	it("shallow renders with full opacity when input text exists", () => {
		var wrapper = shallow(<SubmitButton handleSubmit={() => {}} hasInputText={true} />);    
		expect(wrapper.find("button").prop("style")).toEqual({opacity:1});
	});

});

describe("InputButton component", () => {

	it("shallow renders without crashing", () => {
		let buttonText="test";
		var wrapper = shallow(<InputButton handleSubmit={() => {}} buttonText={buttonText}/>);
		expect(wrapper.find("button").length).toBe(1);
		expect(wrapper.find("button").text()).toEqual(buttonText);
	});

});

describe("SuggestedResponsePane component", () => {

	it("shallow renders without crashing", () => {
		var wrapper = shallow(<SuggestedResponsePane handleSubmit={() => {}}/>);
		expect(wrapper.find(".SuggestedResponsePane").length).toBe(1);
	});

});

describe("InputField component", () => {

	it("shallow renders without crashing", () => {
		var wrapper = shallow(<InputField handleChange={() => {}} handleKeyPress={() => {}}/>);
		expect(wrapper.find("input").length).toBe(1);
	});

});