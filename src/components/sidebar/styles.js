const styles = theme => ({
  drawer: {
    width: 480,
    flexShrink: 0,
    [theme.breakpoints.down(1200)]: {
      width: 280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  drawerPaper: {
    width: 480,
    [theme.breakpoints.down(1200)]: {
      width: 280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  sidebarTop: {
    flexGrow: 1,
    overflowY: "auto",
    paddingTop: 0
  },
  sidebarDown: {
    padding: 0.
  },
  toolbar: theme.mixins.toolbar,
  minifiedToolbar: {
    height: theme.spacing(6),
  },
  button: {
    float: 'right',
  },
  divider: {
    clear: 'both',
  },
  addChatBtn: {
    height: '50px'
  },
  badge: {
    marginRight: '10px',
  }
});

export default styles;