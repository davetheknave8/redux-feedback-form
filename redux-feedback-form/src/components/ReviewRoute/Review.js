import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        width: '500px',
        margin: 'auto',
    },
    button: {
        margin: 'auto'
    },
    content: {
        textAlign: 'left',
        marginLeft: '50px',
        marginTop: '20px',
    },
    score: {
        textAlign: 'right',
        marginRight: '100px',
        fontSize: '2em'
    },
    comments: {
        textAlign: 'right',
        marginRight: '100px',
    }
})

class Review extends Component {

    handleSubmit = () => {
        Axios.post('/feedback', this.props.reduxStore.feedbackItemReducer)
            .then(response => {
                this.props.history.push('/confirmation');
            })
    }

    render() {
        const {classes} = this.props;

        console.log(this.props.reduxStore.feedbackItemReducer.feeling)
        if(this.props.reduxStore.disabledReducer.button === 'disabled'){
            return (
                <>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.content}>Feeling: </Typography>
                            <Typography className={classes.score}>{this.props.reduxStore.feedbackItemReducer.feeling}</Typography>
                        <Typography className={classes.content}>Understanding: </Typography>
                            <Typography className={classes.score}>{this.props.reduxStore.feedbackItemReducer.understanding}</Typography>
                        <Typography className={classes.content}>Support: </Typography>
                            <Typography className={classes.score}>{this.props.reduxStore.feedbackItemReducer.support}</Typography>
                        <Typography className={classes.content}>Comments: </Typography>
                            <Typography className={classes.comments}>{this.props.reduxStore.feedbackItemReducer.comments}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} variant="contained" color="secondary" disabled>Disabled</Button>
                    </CardActions>
                </Card>
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

export default withStyles(styles)(connect(mapReduxStoreToProps)(Review));

