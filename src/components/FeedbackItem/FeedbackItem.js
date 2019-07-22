import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

//Material
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import OutlineFlagIcon from '@material-ui/icons/FlagOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    flagged: {
        backgroundColor: 'orange'
    },
    button: {
        color: 'green'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    }
})

const getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

class FeedbackItem extends Component {

      state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


    handleFlag = () => {
        Axios.put(`/feedback/${this.props.item.id}`, {flagged: 'TRUE'})
            .then(response => {
                this.props.getFeedbackList();
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    handleUnflag = () => {
        Axios.put(`/feedback/${this.props.item.id}`, {flagged: 'FALSE'})
            .then(response => {
                this.props.getFeedbackList();
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    handleDelete = () => {
        console.log('delete');
        Axios.delete(`/feedback/${this.props.item.id}`)
            .then(response => {
                this.props.getFeedbackList();
            })
            .catch(error => {
                console.log('error', error);
            })
        this.setState({ open: false });
    }

    render(){
        const {classes} = this.props
        if(this.props.item.flagged === false){
        return(
            <>
            <TableRow>
                <TableCell>{this.props.item.feeling}</TableCell>
                <TableCell>{this.props.item.understanding}</TableCell>
                <TableCell>{this.props.item.support}</TableCell>
                <TableCell>{this.props.item.comments}</TableCell>
                <TableCell><Button onClick={() => this.handleFlag()}><OutlineFlagIcon /></Button></TableCell>
                <TableCell><Button variant="contained" color="secondary" onClick={() => this.handleOpen()}><DeleteIcon /></Button></TableCell>
            </TableRow>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography>
                            Would you really like to delete this item?
                        </Typography>
                        <br />
                        <br />
                        <Button variant="contained" color="secondary" onClick={this.handleDelete}>Yes, I really would.</Button>
                        <Button variant="contained" onClick={this.handleClose}>No, take me back!</Button>
                    </div>
                </Modal>
            
            </>
        )
        } else if(this.props.item.flagged === true){
            return(
            <>
            <TableRow className={classes.flagged}>
                <TableCell>{this.props.item.feeling}</TableCell>
                <TableCell>{this.props.item.understanding}</TableCell>
                <TableCell>{this.props.item.support}</TableCell>
                <TableCell>{this.props.item.comments}</TableCell>
                <TableCell><Button className={classes.button} onClick={() => this.handleUnflag()}><FlagIcon /></Button></TableCell>
                <TableCell><Button variant="contained" color="secondary" onClick={() => this.handleDelete()}><DeleteIcon /></Button></TableCell>
            </TableRow>
            </>
        )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(FeedbackItem));