const styles = theme => ({

  content: {
    height: 'calc(100vh - 144px)',
    padding: '25px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    width: '100%',
  },

  userSent: {
    float: 'right',
    clear: 'both',
    padding: '10px 20px 18px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: 'white',
    color: theme.palette.text.primary,
    width: 'auto',
    maxWidth: '500px',
    borderRadius: '10px',
    borderBottomRightRadius: 0,
    fontFamily: 'Roboto',
    position: 'relative'
  },

  friendSent: {
    float: 'left',
    clear: 'both',
    padding: '10px 20px 18px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: 'white',
    color: theme.palette.text.primary,
    width: 'auto',
    maxWidth: '500px',
    borderRadius: '10px',
    borderTopLeftRadius: 0,
    fontFamily: 'Roboto',
    position: 'relative'
  },

  neutral: {
    backgroundColor: 'white',
    color: theme.palette.text.primary,
  },
  mad: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    color: 'white'
  },
  sad: {
    backgroundColor: 'rgba(154,0,255,0.7)',
    color: 'white'
  },
  scared: {
    backgroundColor: 'rgba(255,87,0,0.7)',
    color: 'white'
  },
  joyful: {
    backgroundColor: 'rgba(255,221,0,0.7)',
    color: theme.palette.text.primary,
  },
  powerful: {
    backgroundColor: 'rgba(0,255,17,0.7)',
    color: theme.palette.text.primary,
  },
  peaceful: {
    backgroundColor: 'rgba(0, 43, 255, 0.7)',
    color: 'white'
  },

  time: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    fontSize: '10px'
  },
  messageContainer: {
    clear: 'both',
    paddingTop: '35px'
  },
  divider: {
    width: '60%',
    position: 'relative',
    background: 'linear-gradient(90deg, rgba(220,220,220,1) 0%, rgba(173,173,173,1) 50%, rgba(220,220,220,1) 100%)',
    margin: '0 auto 35px',
    height: '1px',
  },
  dividerDate: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dcdcdc',
    padding: '0 20px',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '12px',
    color: '#7d7d7d',
  },
  avatar: {
    marginRight: '10px'
  },
  noAvatar: {
    marginLeft: '50px',
  },
  messageGroupUser: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  messageGroupFriend: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnContainer: {
    paddingLeft: 30,
    position: 'relative',
    '&:hover button': {
      display: 'block',
    }
  },
  moreBtn: {
    padding: 0,
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-36%)',
    display: 'none',
    '&:hover': {
      backgroundColor: 'transparent !important',
    }
  },
  menu: {
    '& ul': {
      padding: 0,
    },
  },
  loader: {
    width: '16px !important',
    height: '16px !important',
    position: 'absolute',
    left: 0,
    top: 'calc(50% - 2px)'
  },
});

export default styles;
