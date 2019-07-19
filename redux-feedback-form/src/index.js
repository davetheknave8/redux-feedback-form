import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';

//Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

const feedbackListReducer = (state = [], action) => {
    if(action.type === 'GET_FEEDBACK_LIST') {
        return action.payload;
    } else {
        return state;
    }
}

const reduxStore = createStore(
    combineReducers({
        feedbackListReducer
    }),
    applyMiddleware(logger)
)

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
