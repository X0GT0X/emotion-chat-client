import React from 'react';
import styles from './styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactItem from "../ContactItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions/chats";
import connect from "react-redux/es/connect/connect";
import AccountPreview from "../AccountPreview";

function mapStateToProps(state) {
    return {
        isFetching: state.chats.isFetching,
        loaded: state.chats.loaded,
        chats: state.chats.chats,
        userLogin: state.auth.login
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class Sidebar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render(){
        const { classes } = this.props;

        return (
            <Drawer
                className={'sidebar ' + classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <Button
                    fullWidth
                    color='primary'
                    className={classes.addChatBtn}
                    onClick={this.props.newChatBtnHandle}
                >Add New Chat</Button>

                <List className={classes.sidebarTop}>
                    {
                        this.props.chats ?
                            this.props.chats.sort((chatA, chatB) =>
                                parseFloat(chatB.lastUpdate) - parseFloat(chatA.lastUpdate))
                                .map((chat, index) => (
                                <ContactItem
                                    key={index}
                                    lastMessage={chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : {message: ''}}
                                    user={chat.users.filter(_user => _user.login !== this.props.userLogin)[0]}
                                    selected={this.props.selectedChatIndex === chat.chat_id}
                                    onClick={() => this.props.selectChatHandle(chat.chat_id, chat.receiverHasRead)}
                                    receiverHasRead={chat.receiverHasRead}
                                />
                            )) : null
                    }
                </List>

                <div className='sidebar-down'>
                    <Divider />
                    <AccountPreview user={this.props.user}/>
                    <List className={classes.sidebarDown}>
                        <ListItem button onClick={this.props.accountHandleClick}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button onClick={this.props.logOutHandleClick}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        );

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));