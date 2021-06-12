const styles = theme => ({
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.down('md')]: {
      width: drawerWidth - 50,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 64,
    [theme.breakpoints.down('md')]: {
      marginTop: 48,
      width: drawerWidth - 50,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.text.disabled
  },
  chatInfo: {},
  avatar: {
    width: 150,
    height: 150,
    fontSize: '3rem',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: theme.palette.secondary,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  },
  title: {
    textAlign: 'center',
    margin: '0 auto 20px',
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    display: 'inline',
    '&:hover button': {
      display: 'block',
    },
  },
  userList: {
    padding: 0,
    maxHeight: 360,
    overflowY: 'auto',
  },
  listLabel: {
    fontWeight: 400,
    paddingLeft: 15,
    position: 'relative',
    paddingRight: 16,
    display: 'inline',
    marginRight: 'auto',
    '&:hover button': {
      display: 'block',
    },
  },
  editBtn: {
    color: theme.palette.text.disabled,
    position: 'absolute',
    right: -10,
    top: '50%',
    transform: 'translateY(-50%)',
    padding: 0,
    display: 'none',
    '&:hover': {
      display: 'block',
      backgroundColor: 'transparent',
    },
  },
  titleEditField: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
  },
  iconBtn: {
    padding: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  deleteBtn: {
    color: 'red',
  },
});

export default styles;
