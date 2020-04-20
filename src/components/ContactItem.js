import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/data";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

const styles = theme => ({
    listItem: {
        position: 'relative',
        '&.Mui-selected': {
            backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
        }
    },
    time: {
        fontSize: '12px',
        fontFamily: "'Roboto', sans-serif",
        position: 'absolute',
        right: '16px',
        top: '14px',
        color: theme.palette.text.secondary
    },
    avatar: {
        // border: '2px solid',
        borderColor: theme.palette.text.disabled,
    },
    notification: {
        position: 'absolute',
        right: '19px',
        top: '30px',
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.data.isFetching,
        token: state.auth.token,
        data: state.data.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class ContactItem extends React.Component{

    checkTime = (i) => i < 10 ? ("0" + i) : i;

    getTime(date) {
        let h = date.getHours();
        let m = date.getMinutes();

        m = this.checkTime(m);
        return h + ':' + m;
    }

    getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));

        let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

        return [d.getUTCFullYear(), weekNo];
    }

    getTimeFormat(date) {

        const now = new Date();
        const isToday = new Date(date.getTime()).setHours(0, 0, 0, 0) === new Date(now.getTime()).setHours(0, 0, 0, 0);
        const isThisWeek = this.getWeekNumber(date)[0] === this.getWeekNumber(now)[0] &&
            this.getWeekNumber(date)[1] === this.getWeekNumber(now)[1];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        if(isToday) return this.getTime(date);
        else if(isThisWeek) return days[date.getDay()];
        else {
            if(date.getUTCFullYear() === now.getUTCFullYear())
                return months[date.getMonth()] + ' ' + date.getDate();
            else return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getUTCFullYear();
        }

    }

    userIsSender = () => this.props.data.login === this.props.lastMessage.sender;

    render(){
        const user = this.props.user;
        const { classes } = this.props;

        if(this.props.data)
            return (
                <ListItem className={classes.listItem} button selected={this.props.selected} onClick={this.props.onClick}>
                    <ListItemAvatar>
                        {
                            user.profile_image ? <Avatar
                                    src={'http://localhost:5000' + user.profile_image}
                                    className={classes.avatar}
                                /> :
                                <Avatar className={classes.avatar}>
                                    {user.name.charAt(0).toUpperCase() + '' + (user.surname ? user.surname.charAt(0).toUpperCase() : '')}
                                </Avatar>
                        }
                    </ListItemAvatar>
                    <ListItemText
                        primary={<b>{user.name + ' ' + (user.surname ? user.surname : '')}</b>}
                        secondary={
                            <React.Fragment>
                                {this.props.lastMessage.message.substr(0, 50) + ( this.props.lastMessage.message.length > 50 ? '...' : '')}
                            </React.Fragment>
                        }
                    />
                    <span className={classes.time}>
                        {
                            this.props.lastMessage.timestamp ?
                                this.getTimeFormat(new Date(parseInt(this.props.lastMessage.timestamp)))
                                : null
                        }
                    </span>
                    {
                        !this.props.receiverHasRead && !this.userIsSender() &&this.props.lastMessage.message.length > 0 ?
                            <NotificationImportantIcon color="primary" className={classes.notification}/> : null
                    }
                </ListItem>
            );
        else return null;
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactItem));