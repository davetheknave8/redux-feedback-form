import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import Review from '../ReviewRoute/Review';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    input: {
        width: '330px',
        margin: theme.spacing.unit
    }
})

class Support extends Component {

    handleChange = (newProp, event) => {
        this.props.dispatch({ type: 'SET_FEEDBACK_ITEM', payload: { prop: 'support', value: event.target.value } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push('/comments');
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <Header />
            <form onSubmit={event => this.handleSubmit(event)}>
                <TextField className={classes.input} label="How well are you being supported?" type="number" onChange={(event) => this.handleChange('support', event)}/>
                <br />
                <Button color="primary" variant="contained" type="submit">Next</Button>
            </form>
                <br />
                <hr />
                <br />
            <Review />
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(Support));