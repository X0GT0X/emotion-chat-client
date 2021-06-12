const styles = theme => ({
  listItem: {
    position: 'relative',
    '&.Mui-selected': {
      backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
    }
  },
  group3: {
    marginLeft: '-35px',
    '&:first-child': {
      marginLeft: '-8px'
    }
  },
  title: {
    fontSize: '18px',
    marginLeft: '5px',
    fontWeight: 500
  },
});

export default styles;
