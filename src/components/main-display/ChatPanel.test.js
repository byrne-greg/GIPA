import React from "react";
import ChatPanel, {Disclaimer} from "./ChatPanel.js";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";

describe("ChatPanel component", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	// // TODO these get to the point of updating the state but it doesn't seem to output
	// it("renders without crashing", () => {
	//   console.log("Test 1");
	//   fetch.mockResponse(JSON.stringify({ conversation: {output: {text: ["mock test message"]}}, context: {} }));
	//   var wrapper = mount(<ChatPanel />);
	//   console.log(wrapper.state());
	// });

	// // TODO these get to the point of updating the state but it doesn't seem to output
	// it("renders with fallback message", () => {
	//   console.log("Test 2");
	//   fetch.mockResponse(JSON.stringify({}));
	//   var wrapper = mount(<ChatPanel />);
	//   console.log(wrapper.update().state());
	// });

	it("full render matches expected snapshot", () => {
		fetch.mockResponse(JSON.stringify({ conversation: {output: {text: ["mock test message"]}}, context: {} }));
		const chatPanel = renderer.create(<ChatPanel/>).toJSON();
		expect(chatPanel).toMatchSnapshot();
	});

});

describe("Disclaimer component", () => {

	it("shallow renders without crashing", () => {
		var wrapper = shallow(<Disclaimer/>);
		expect(wrapper.find(".Disclaimer").length).toBe(1);
	});

});