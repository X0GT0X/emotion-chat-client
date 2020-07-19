import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './styles';

class MessageBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.submitMessage = this.submitMessage.bind(this);

  }


  render() {

    const {classes} = this.props;

    return (
      <div className={'message-box ' + classes.messageBox}>
        <TextField
          style={{margin: 8}}
          placeholder="Enter your message..."
          margin="normal"
          className={classes.textField}
          onKeyUp={(e) => this.userTyping(e)}
          onChange={(e) => this.setState({message: e.target.value})}
          autoComplete="off"
          id='message-box'
          helperText='Press Enter to send the message'
          value={this.state.message}
        />
        <Send onClick={this.submitMessage} className={classes.button}/>
      </div>
    );
  }

  userTyping(e) {
    if (e.keyCode === 13) this.submitMessage();
    else this.setState({
      message: e.target.value
    });
  }

  messageValid = (txt) => txt && txt.replace(/\s/g, '').length > 0;

  submitMessage() {
    if (this.messageValid(this.state.message)) {
      this.props.sendMessageHandle(this.state.message, this.props.selectedChatType);
      this.setState({message: ''});
    }
  }

}

export default withStyles(styles)(MessageBox);