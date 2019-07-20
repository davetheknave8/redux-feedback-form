import React, {Component} from 'react';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import Review from '../ReviewRoute/Review';

class Comments extends Component {

    state = {
        comments: ''
    }

    handleChange = (newProp, event) => {
        this.props.dispatch({ type: 'SET_FEEDBACK_ITEM', payload: { prop: 'comments', value: event.target.value } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ENABLE_BUTTON'})
        this.props.history.push('/review');
        
    }

    render(){
        return(
            <>
            <Header />
            <form onSubmit={event => this.handleSubmit(event)}>
                <label>Have any comments?</label>
                <input type="text" onChange={(event) => this.handleChange('comments', event)}/>
                <button type="submit">Next</button>
            </form>
            <Review history={this.props.history}/>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(Comments);