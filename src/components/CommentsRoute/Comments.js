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
        const {classes} = this.props;
        return(
            <>
            <Header />
            <form onSubmit={event => this.handleSubmit(event)}>
                <TextField className={classes.input} label="Have any comments?" type="text" onChange={(event) => this.handleChange('comments', event)}/>
                <Button color="primary" variant="contained" type="submit">Next</Button>
            </form>
            <Review history={this.props.history}/>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(Comments));