// required for Enzyme
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

// required for mocking fetch requests with Jest
global.fetch = require("jest-fetch-mock");