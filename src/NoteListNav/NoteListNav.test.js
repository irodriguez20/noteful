import React from "react";
import NoteListNav from "./NoteListNav";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe(`NoteListNav component`, () => {
  it("renders a .NoteListNav by default", () => {
    const wrapper = shallow(<NoteListNav />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
