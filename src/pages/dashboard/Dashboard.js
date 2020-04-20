import React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import ChatView from '../../components/chatview/ChatView';
import styles from './styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Typography from '@material-ui/core/Typography';
import MessageBox from "../../components/messagebox/MessageBox";
import withStyles from "@material-ui/core/styles/withStyles";
import LogOutDialog from "../../components/LogOutDialog";
import AccountDialog from "../../components/AccountDialog";
import { fetchUserChats, readChat } from "../../actions/chats";
import { fetchProtectedData } from "../../actions/data";
import connect from "react-redux/es/connect/connect";
import io from 'socket.io-client'
import AddChatDialog from "../../components/AddChatDialog";

const mapStateToProps = (state) => ({
    isFetching: state.chats.isFetching,
    loaded: state.chats.loaded,
    chats: state.chats.chats,
    userLogin: state.auth.login,
    userData: state.data.data,
    token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    getChats: (token) => dispatch(fetchUserChats(token)),
    readChat: (chat) => dispatch(readChat(chat)),
    getUserData: (token) => dispatch(fetchProtectedData(token))
});

const socket = io('http://localhost:5000');

class Dashboard extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectedChat: null,
            logOutDialogOpen: false,
            accountDialogOpen: false,
            addChatDialogOpen: false
        };

        this.setModalOpen = this.setModalOpen.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.selectChat = this.selectChat.bind(this);
        this.readMessage = this.readMessage.bind(this);

    }

    componentDidMount(){
        this.props.getChats(this.props.token);
        this.props.getUserData(this.props.token);
        this.setSocketListeners();
    }

    setSocketListeners(){
        socket.on('message_sent', () => this.props.getChats(this.props.token));
    }

    selectChat(chatId, receiverHasRead){
        if(!receiverHasRead) this.readMessage(chatId)
            .then(() => this.setState({
                selectedChat: chatId
            }));
        else this.setState({
            selectedChat: chatId
        });
    }

    newChatBtnClicked = () => this.setModalOpen('add-chat', true);

    async readMessage(chatId){
        await this.props.readChat(chatId);
    }

    sendMessage(msg){

        const message = {
            'sender': this.props.userLogin,
            'chat': this.state.selectedChat,
            'message': msg
        };

        socket.emit('send_message', message);

    }

    setModalOpen(modal, state){
        switch (modal) {
            case 'logout':
                this.setState({logOutDialogOpen: state});
                break;
            case 'account':
                this.setState({accountDialogOpen: state});
                break;
            case 'add-chat':
                this.setState({addChatDialogOpen: state});
                break;
            default:
                return;
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={'dashboard ' + classes.dashboard}>
                <Sidebar
                    history={this.props.history}
                    newChatBtnHandle={this.newChatBtnClicked}
                    selectChatHandle={this.selectChat}
                    selectedChatIndex={this.state.selectedChat}
                    logOutHandleClick={() => this.setModalOpen('logout', true)}
                    accountHandleClick={() => this.setModalOpen('account', true)}
                    user={this.props.userData}
                />
                <div className={'content ' + classes.content}>

                    {
                        this.state.selectedChat !== null ?
                            <div className={classes.chatViewContainer}>
                                <ChatView
                                    chat={this.props.chats.filter(_chat => _chat.chat_id === this.state.selectedChat)[0]}
                                />
                                <MessageBox
                                    selectedChat={this.state.selectedChat}
                                    sendMessageHandle={this.sendMessage}
                                    readMessageHandle={this.readMessage}
                                />
                            </div> :
                            <div className={classes.defaultComponent}>
                                <div className="container">
                                    <QuestionAnswerIcon className={classes.bigIcon}/>
                                    <Typography element='p' className={classes.text}>Choose a chat to start conversation.</Typography>
                                </div>
                            </div>
                    }

                </div>

                <LogOutDialog open={this.state.logOutDialogOpen} setOpen={this.setModalOpen}/>
                {this.props.userData ?
                    <AccountDialog
                        open={this.state.accountDialogOpen}
                        setOpen={this.setModalOpen}
                    /> : null}
                <AddChatDialog
                    open={this.state.addChatDialogOpen}
                    setOpen={this.setModalOpen}
                />
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));