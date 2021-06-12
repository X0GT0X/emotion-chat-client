const styles = theme => ({
  chatPreview: {
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.6)',
    zIndex: 10,
    minHeight: 72,
    [theme.breakpoints.down('md')]: {
      minHeight: 64,
    },
    display: 'flex',
    alignItems: 'center'
  },
  accountContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  menu: {
    '& ul': {
      padding: 0,
    },
  },
});

export default styles;
