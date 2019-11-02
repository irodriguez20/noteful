import React from "react";
import AddFolder from "./AddFolder";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe(`AddItemForm component`, () => {
  it("renders the complete form", () => {
    const wrapper = shallow(<AddFolder />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
