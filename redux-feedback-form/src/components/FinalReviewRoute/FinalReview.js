import React, {Component} from 'react';
import Review from '../ReviewRoute/Review'

class FinalReview extends Component {
    render(){
        return(
            <>
                <header className="App-header">
                    <h1>Review Your Information</h1>
                </header>
                <Review history={this.props.history}/>
            </>
        )
    }
}

export default FinalReview;