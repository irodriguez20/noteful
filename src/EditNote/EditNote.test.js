import React from 'react';
import ReactDOM from 'react-dom';
import EditNote from './EditNote';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: {} },
        history: {
            push: () => { }
        },
    }
    ReactDOM.render(<EditNote {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});