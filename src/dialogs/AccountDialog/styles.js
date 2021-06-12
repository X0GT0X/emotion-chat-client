const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    fontSize: '2.25rem',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
    position: 'relative'
  },
  form: {
    width: '100%'
  },
  input: {
    '&:hover:before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42) !important'
    }
  },
  label: {
    fontSize: '16px',
    marginTop: '10px'
  },
  passwordInput: {
    marginTop: '-5px'
  },
  alert: {
    marginBottom: '20px'
  }
});

export default styles;
