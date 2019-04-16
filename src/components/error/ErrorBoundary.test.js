import React from "react";
import ErrorBoundary from "./ErrorBoundary.js";
import {shallow, mount} from "enzyme";

describe("ErrorBoundary component", () => {

	// used to supress the intentionally thrown error to appear in the test console
	// taken from https://github.com/facebook/react/issues/11098#issuecomment-370614347
	beforeEach(() => {
		jest.spyOn(console, "error");
		global.console.error.mockImplementation(() => {});
	});  
	afterEach(() => {
		global.console.error.mockRestore();
	});
  
	it("shallow renders without crashing", () => {
		shallow(<ErrorBoundary />);
	});

	it("shallow renders with error message when error info has a value", () => {
		var wrapper = shallow(<ErrorBoundary />);
		wrapper.setState({errorInfo: "I encountered an error"});
		expect(wrapper.find(".errorMessageContainer").length).toBe(1);
	});

	it("shallow renders with error message when error info has a value", () => {
		var wrapper = shallow(<ErrorBoundary />);
		wrapper.setState({error: "I encountered an error"});
		expect(wrapper.find(".errorMessageContainer").length).toBe(1);
	});

	it("renders with error message when child component throws an error", () => {
		var wrapper = mount(<ErrorBoundary ><ProblemComponentMock /></ErrorBoundary>);
		expect(wrapper.find(".errorMessageContainer").length).toBe(1);
	});

	it("renders with error message when child component throws an error", () => {
		var wrapper = mount(<ErrorBoundary ><WorkingComponentMock /></ErrorBoundary>);
		expect(wrapper.find("#working_fine").length).toBe(1);
	});

});

const ProblemComponentMock = () => {
	throw new Error("mock error");
	return <div>Error</div>;
};

const WorkingComponentMock = () => {
	return <div id="working_fine">Working</div>;
};