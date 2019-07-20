import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

class FeedbackItem extends Component {


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
    }

    render(){
        if(this.props.item.flagged === false){
        return(
            <>
            <tr>
                <td>{this.props.item.feeling}</td>
                <td>{this.props.item.understanding}</td>
                <td>{this.props.item.support}</td>
                <td>{this.props.item.comments}</td>
                <td><button onClick={() => this.handleFlag()}>Flag Item</button></td>
                <td><button onClick={() => this.handleDelete()}>Delete</button></td>
            </tr>
            </>
        )
        } else if(this.props.item.flagged === true){
            return(
            <>
            <tr>
                <td>{this.props.item.feeling}</td>
                <td>{this.props.item.understanding}</td>
                <td>{this.props.item.support}</td>
                <td>{this.props.item.comments}</td>
                <td>FLAGGED<button onClick={() => this.handleUnflag()}>Unflag item</button></td>
                <td><button onClick={() => this.handleDelete()}>Delete</button></td>
            </tr>
            </>
        )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(FeedbackItem);