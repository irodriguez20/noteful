import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

console.log(process.env)

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>,
document.getElementById('root')
)

