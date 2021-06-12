const stles = theme => ({
  listItem: {
    position: 'relative',
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
    // border: '2px solid',
    borderColor: theme.palette.text.disabled,
  },
  button: {
    padding: 0
  },
});
