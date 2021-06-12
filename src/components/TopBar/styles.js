/**
 * Provides styles object for TopBar component.
 * @param theme
 * @return object
 */
const styles = theme => ({
  header: {
    zIndex: theme.zIndex.drawer + 1
  },
  container: {
    backgroundColor: theme.palette.primary.main
  },
  logo: {
    maxWidth: 48,
    marginRight: 10
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    [theme.breakpoints.down('md')]: {
      minHeight: 48
    }
  },
  button: {
    paddingRight: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  icon: {
    color: 'white'
  }
});

export default styles;
