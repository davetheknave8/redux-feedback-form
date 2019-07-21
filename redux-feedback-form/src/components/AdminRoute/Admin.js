import React, { Component } from 'react';
import {connect} from 'react-redux';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import Axios from 'axios';

//Material
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

})

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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Feeling</TableCell>
                        <TableCell>Understanding</TableCell>
                        <TableCell>Support</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Flagged</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                 </TableHead>
                 <TableBody>
                    {this.props.reduxStore.feedbackListReducer.map((item, i) => <FeedbackItem getFeedbackList={this.getFeedbackList} item={item} key={i}/>)}
                </TableBody>
             </Table>
            </>

        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(Admin));