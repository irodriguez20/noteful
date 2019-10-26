import React from 'react';
import ReactDOM from 'react-dom';
import NotefulForm from './NotefulForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotefulForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});