import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount = () => {
    this.getFeedbackList()
  }

  getFeedbackList = () => {
    axios.get('/feedback')
      .then(response => {
        this.props.dispatch({type: 'GET_FEEDBACK_LIST', payload: response.data})
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4><i>Don't forget it!</i></h4>
        </header>
        <br/>
      </div>
    );
  }
}

const mapReduxStoreToProps = reduxStore => ({
  reduxStore
})

export default connect(mapReduxStoreToProps)(App);
