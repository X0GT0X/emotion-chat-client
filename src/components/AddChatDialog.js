import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import {fetchUsersData, cleanUsersData} from "../actions/data";
import {addChat, addChatClose} from "../actions/chats";
import connect from "react-redux/es/connect/connect";
import AccountPreview from "./AccountPreview";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    progress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15px',
    },
    user: {
        cursor: 'pointer',
    }
});

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        error: state.chats.addChatError,
        isAddingChat: state.chats.isAddingChat,
        usersList: state.data.usersList,
        isFetching: state.data.isFetching,
    };
}

const mapDispatchToProps = (dispatch) => ({
    addChat: (userLogin, openModal) => dispatch(addChat(userLogin, openModal)),
    addChatClose: () => dispatch(addChatClose()),
    fetchUsersData: (token, login) => dispatch(fetchUsersData(token, login)),
    cleanUsersData: () => dispatch(cleanUsersData()),
});

class AddChatDialog extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            login: '',
        };

        this.userTyping = this.userTyping.bind(this);
        this.chooseUser = this.chooseUser.bind(this);

    }

    userTyping = (e) => {
        let login = e.target.value;
        if(login.length >= 3){
            this.props.fetchUsersData(this.props.token, login);
        }
        else{
            this.props.cleanUsersData();
        }
        this.setState({ login });
    };

    handleClose = () => {
        this.props.setOpen('add-chat', false);
        this.setState({login: ''});
        this.props.addChatClose();
        this.props.cleanUsersData();
    };

    handleAddChat = () => {
        this.props.addChat(this.state.login, this.props.setOpen);
        this.setState({login: ''});
    };

    chooseUser(login){
        this.props.fetchUsersData(this.props.token, login);
        this.setState({login});
    }

    render(){

        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="add-chat-dialog-title"
                aria-describedby="add-chat-dialog-description"
                maxWidth='sm'
                fullWidth={true}
            >
                <DialogTitle id="add-chat-dialog-title">{"Add new chat"}</DialogTitle>
                <DialogContent>
                    {
                        this.props.error ?
                            <Alert severity="error">
                                {this.props.error}
                            </Alert> : null
                    }
                    <div>
                        <TextField
                            margin='dense'
                            id='add-chat-login-input'
                            label='Enter user login'
                            fullWidth
                            value={this.state.login}
                            onChange={(e) => this.userTyping(e)}
                            autoComplete="off"
                        />
                        {
                            this.props.usersList && this.state.login.length >= 3 ? <div className="users-list">
                                    {
                                        this.props.usersList.map((user, index) => <AccountPreview
                                            key={index}
                                            user={user}
                                            className={classes.user}
                                            handleClick={this.chooseUser}
                                            selected={this.state.login === user.login}
                                        />)
                                    }
                            </div> : null
                        }
                        {
                            this.props.usersList &&
                            this.props.usersList.length === 0 &&
                            this.state.login.length >= 3 ? <ListItem>
                                <ListItemText
                                    secondary={'User with this login does not exist or ' +
                                    'you already have a chat with this user.'}
                                />
                            </ListItem> : null
                        }
                        {
                            this.props.isFetching ? <div className={classes.progress}>
                                <CircularProgress color="primary"/>
                            </div> : null
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAddChat} color="primary">Add</Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddChatDialog));