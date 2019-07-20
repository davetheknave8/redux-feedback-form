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

const feedbackItemReducer = (state = {feeling: 0, understanding: 0, support: 0, comments: ''}, action) => {
    if(action.type === 'SET_FEEDBACK_ITEM'){
        let newProp = action.payload.prop;
        state = {...state, [newProp]: action.payload.value}
        return state;
    } else if(action.type === 'CLEAR_FEEDBACK') {
        state = { feeling: 0, understanding: 0, support: 0, comments: '' }
        return state;
    } else {
        return state;
    }
}

const disabledReducer = (state = {button: 'disabled'}, action) => {
    if(action.type === 'ENABLE_BUTTON'){
        return {button: 'enabled'};
    } else if(action.type === 'DISABLE_BUTTON'){
        return {button: 'disabled'};
    } else {
        return state;
    }
}

const reduxStore = createStore(
    combineReducers({
        feedbackListReducer,
        feedbackItemReducer,
        disabledReducer
    }),
    applyMiddleware(logger)
)

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
