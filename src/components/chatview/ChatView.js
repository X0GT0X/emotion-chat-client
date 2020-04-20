import React from 'react';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions/chats";
import connect from "react-redux/es/connect/connect";

function mapStateToProps(state) {
    return {
        userLogin: state.auth.login
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const checkTime = (i) => i < 10 ? ("0" + i) : i;

function getTimeFormat(date) {

    const now = new Date();
    const isToday = new Date(date.getTime()).setHours(0, 0, 0, 0) === new Date(now.getTime()).setHours(0, 0, 0, 0);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if(isToday) return 'Today';
    else {
        if(date.getUTCFullYear() === now.getUTCFullYear())
            return months[date.getMonth()] + ' ' + date.getDate();
        else return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getUTCFullYear();
    }

}

class ChatView extends React.Component{

    componentDidMount(){
        const container = document.getElementById('chatview-container');
        if(container) container.scrollTo(0, container.scrollHeight);
    }

    componentDidUpdate(){
        const container = document.getElementById('chatview-container');
        if(container) container.scrollTo(0, container.scrollHeight);
    }

    getTime(date) {
        let h = date.getHours();
        let m = date.getMinutes();

        m = checkTime(m);
        return h + ':' + m;
    }

    setDivider(msg, index){
        if(index !== 0){
            const currentMessageDate = new Date(parseInt(msg.timestamp)).setHours(0, 0, 0, 0);
            const prevMessageDate = new Date(parseInt(this.props.chat.messages[index-1].timestamp)).setHours(0, 0, 0, 0);

            let result = null;

            if(currentMessageDate !== prevMessageDate)
                result = getTimeFormat(new Date(parseInt(msg.timestamp)));
            return result;
        }
        else{
            const currentMessageDate = new Date(parseInt(msg.timestamp));
            return getTimeFormat(currentMessageDate);
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div id='chatview-container' className={classes.content}>
                <main>
                    {
                        this.props.chat.messages.map((_msg, _index) => <div className={this.setDivider(_msg, _index) ? classes.messageContainer: null} key={_index}>
                            {this.setDivider(_msg, _index) ? <div className={classes.divider}>
                                <Typography component='p' variant='body1' className={classes.dividerDate}>
                                    {this.setDivider(_msg, _index)}
                                    </Typography>
                            </div> : null}
                            <div
                                key={_index}
                                className={_msg.sender === this.props.userLogin ? classes.userSent : classes.friendSent}
                            >
                                {_msg.message}
                                <span className={classes.time}>{this.getTime(new Date(parseInt(_msg.timestamp)))}</span>
                            </div>
                        </div>)
                    }
                </main>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatView));