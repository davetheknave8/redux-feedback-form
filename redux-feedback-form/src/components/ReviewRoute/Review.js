import React, { Component } from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'
import Axios from 'axios';

class Review extends Component {

    handleSubmit = () => {
        Axios.post('/feedback', this.props.reduxStore.feedbackItemReducer)
            .then(response => {
                this.props.history.push('/confirmation');
            })
    }

    render() {
        console.log(this.props.reduxStore.feedbackItemReducer.feeling)
        if(this.props.reduxStore.disabledReducer.button === 'disabled'){
            return (
                <>
                <p>Feeling: {this.props.reduxStore.feedbackItemReducer.feeling}</p>
                <p>Understanding: {this.props.reduxStore.feedbackItemReducer.understanding}</p>
                <p>Support: {this.props.reduxStore.feedbackItemReducer.support}</p>
                <p>Comments: {this.props.reduxStore.feedbackItemReducer.comments}</p>
                <Button variant="contained" color="secondary" disabled>Disabled</Button>
            </>
            )
        } else if(this.props.reduxStore.disabledReducer.button === 'enabled'){
            return (
                <>
                <p>Feeling: {this.props.reduxStore.feedbackItemReducer.feeling}</p>
                <p>Understanding: {this.props.reduxStore.feedbackItemReducer.understanding}</p>
                <p>Support: {this.props.reduxStore.feedbackItemReducer.support}</p>
                <p>Comments: {this.props.reduxStore.feedbackItemReducer.comments}</p>
                <Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
            </>
            )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(Review);

