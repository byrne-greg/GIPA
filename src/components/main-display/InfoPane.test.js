import React from "react";
import InfoPane from "./InfoPane";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";

describe("InfoPane component", () => {
  
	it("shallow renders without crashing", () => {
		shallow(<InfoPane />);
	});

	it("full render matches expected snapshot when not showing infopane", () => {
		const component = renderer.create(<InfoPane/>).toJSON();
		expect(component).toMatchSnapshot();
	});

	it("shallow renders with \"display: none\" by default", () => {
		const component = shallow(<InfoPane/>);
		expect(component.find(".InfoPane__overlay").prop("style").display).toEqual("none");
	});

	it("shallow renders with \"display: block\" when overlay button is clicked", () => {
		const component = shallow(<InfoPane/>);
		component.find(".InfoPane__overlayOpenButton").simulate("click");
		expect(component.find(".InfoPane__overlay").prop("style").display).toEqual("block");
	});

});