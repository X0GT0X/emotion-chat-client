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
  avatarGroup: {
    marginLeft: '-35px',
    '&:first-child': {
      marginLeft: '-5px'
    }
  },
  avatarGroup3: {
    marginLeft: '-35px',
    '&:first-child': {
      marginLeft: '-8px'
    }
  },
  textGroup: {
    marginLeft: '8px',
  },
  textGroup3: {
    marginLeft: '6px',
  },
  notification: {
    position: 'absolute',
    right: '19px',
    top: '30px',
  },
  groupWithPhoto: {
    marginLeft: -3
  },
  listItemAvatar: {
    minWidth: 0
  }
});

export default styles;
