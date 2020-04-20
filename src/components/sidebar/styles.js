const styles = theme => ({
    drawer: {
        width: 480,
        flexShrink: 0,
        [theme.breakpoints.down(992)]: {
            width: 280,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    drawerPaper: {
        width: 480,
        [theme.breakpoints.down(992)]: {
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
    addChatBtn: {
      height: '50px'
    },
});

export default styles;