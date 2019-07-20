import React, { Component } from 'react';
import {connect} from 'react-redux';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import Axios from 'axios';

class Admin extends Component {

    componentDidMount = () => {
        this.getFeedbackList();
    }

    getFeedbackList = () => {
    Axios.get('/feedback')
      .then(response => {
        this.props.dispatch({type: 'GET_FEEDBACK_LIST', payload: response.data})
      })
      .catch(error => {
          console.log(error);
      })
    }

    render() {
        return (
            <>
            <header className="App-header">
                <h1>Admin</h1>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Feeling</th>
                        <th>Understanding</th>
                        <th>Support</th>
                        <th>Comments</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.feedbackListReducer.map((item, i) => <FeedbackItem getFeedbackList={this.getFeedbackList} item={item} key={i}/>)}
                </tbody>
            </table>
            </>

        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(Admin);