import React from "react";
import App from "./App";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";

describe("IconLink functional component", () => {
  
  it("shallow renders without crashing", () => {
    shallow(<App/>);
  });

  it("TODO full render matches expected snapshot", () => {
    // const app = renderer.create(<App/>).toJSON();
    // expect(app).toMatchSnapshot();
  });
});

