import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'

class Confirmation extends Component {

    handleClick = () => {
        this.props.dispatch({type: 'DISABLE_BUTTON'})
        this.props.dispatch({type: 'CLEAR_FEEDBACK'})
        this.props.history.push('/');
    }

    render() {
        return (
            <>
            <header className="App-header">
                <h1>You submitted your feedback!</h1>

            </header>
            <h1>Thank You!</h1>
            <Button onClick={this.handleClick} variant="contained" color="primary">Leave New Feedback</Button>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(Confirmation);