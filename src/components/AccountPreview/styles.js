const styles = theme => ({
  listItem: {
    position: 'relative',
    '&.Mui-selected': {
      backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
    }
  },
  pointedListItem: {
    position: 'relative',
    cursor: 'pointer',
    '&.Mui-selected': {
      backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
    }
  },
  time: {
    fontSize: '12px',
    fontFamily: '\'Roboto\', sans-serif',
    position: 'absolute',
    right: '16px',
    top: '14px',
    color: theme.palette.text.secondary
  },
  avatar: {
    borderColor: theme.palette.text.disabled
  },
  owner: {
    '& span': {
      position: 'relative',
      transform: 'none'
    }
  },
  avatarContainer: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
});

export default styles;
