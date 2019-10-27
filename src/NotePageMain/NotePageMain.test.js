import React from 'react';
import NotePageMain from './NotePageMain';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe(`NotePageMain component`, () => {

  it('renders a .NotePageMain by default', () => {
    const wrapper = shallow(<NotePageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
