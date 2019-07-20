import React, {Component} from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import Review from '../ReviewRoute/Review';

class Support extends Component {

    handleChange = (newProp, event) => {
        this.props.dispatch({ type: 'SET_FEEDBACK_ITEM', payload: { prop: 'support', value: event.target.value } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push('/comments');
    }

    render(){
        return(
            <>
            <Header />
            <form onSubmit={event => this.handleSubmit(event)}>
                <label>How well are you being supported?</label>
                <input type="number" onChange={(event) => this.handleChange('support', event)}/>
                <button type="submit">Next</button>
            </form>
            <Review />
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(Support);