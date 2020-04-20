import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <h1>Not Found</h1>
            </div>
        );
    }
}

export default NotFound;