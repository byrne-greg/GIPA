import React from "react";
import ScrollingMessagesPane, {Message} from "./ScrollingMessagesPane.js";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";

describe("ScrollingMessagesPane component", () => {

	it("shallow renders without crashing", () => {
		shallow(<ScrollingMessagesPane/>);
	});

	it("full render matches expected snapshot", () => {
		const component = renderer.create(<ScrollingMessagesPane/>).toJSON();
		expect(component).toMatchSnapshot();
	});

});

describe("Message component", () => {

	it("shallow renders without crashing", () => {
		shallow(<Message text="test" type="test"/>);
	});

	it("shallow renders with given css type", () => {
		let cssMessageType = "cssMessageType";
		var wrapper = shallow(<Message text="test" type={cssMessageType}/>);
		expect(wrapper.find("div").prop("className")).toBe("ScrollingMessagesPane__" + cssMessageType);
	});

	it("full render matches expected snapshot", () => {
		const component = renderer.create(<Message text="test" type="cssMessageType"/>).toJSON();
		expect(component).toMatchSnapshot();
	});

});