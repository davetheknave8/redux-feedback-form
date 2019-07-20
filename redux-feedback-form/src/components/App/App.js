import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {connect} from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

//Importing Routes
import Feeling from '../FeelingRoute/Feeling';
import Understanding from '../UnderstandingRoute/Understanding';
import Support from '../SupportRoute/Support';
import Comments from '../CommentsRoute/Comments';
import FinalReview from '../FinalReviewRoute/FinalReview';
import Confirmation from '../ConfirmationRoute/Confirmation';
import Admin from '../AdminRoute/Admin';

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
        <Router>
          <Route path="/" exact component={Feeling} />
          <Route path="/understanding" component={Understanding} />
          <Route path="/support" component={Support} />
          <Route path="/comments" component={Comments} />
          <Route path="/review" component={FinalReview} />
          <Route path="/confirmation" component={Confirmation} />
          <Route getFeedbackList={this.getFeedbackList} path="/admin" component={Admin} />
        </Router>
      </div>
    );
  }
}

const mapReduxStoreToProps = reduxStore => ({
  reduxStore
})

export default connect(mapReduxStoreToProps)(App);
