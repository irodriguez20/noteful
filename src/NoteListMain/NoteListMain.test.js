import React from 'react';
import NoteListMain from './NoteListMain';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe(`NoteListMane component`, () => {
  it('renders a .NoteListMain by default', () => {
    const wrapper = shallow(<NoteListMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
