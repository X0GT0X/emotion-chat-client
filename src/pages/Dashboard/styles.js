const drawerWidth = 350;

const styles = theme => ({
  dashboard: {
    height: '100%',
    display: 'flex'
  },
  content: {
    marginTop: 64,
    [theme.breakpoints.down('md')]: {
      marginTop: 48,
      marginRight: 0
    },
    flexGrow: 1,
    maxHeight: '100%',
    marginRight: -drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginTop: 64,
    [theme.breakpoints.down('md')]: {
      marginTop: 48
    },
    flexGrow: 1,
    maxHeight: '100%',
    marginRight: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  bigIcon: {
    fontSize: '10em',
    fill: '#9a9a9a'
  },
  defaultComponent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexGrow: 2,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  text: {
    color: '#737373'
  },
  chatViewContainer: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }
});

export default styles;
