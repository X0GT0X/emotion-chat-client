const styles = theme => ({

    content: {
        height: 'calc(100vh - 144px)',
        padding: '25px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: 0,
        width: '100%',
        position: 'absolute'
    },

    userSent: {
        float: 'right',
        clear: 'both',
        padding: '10px 20px 18px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        width: 'auto',
        maxWidth: '500px',
        borderRadius: '10px',
        borderBottomRightRadius: 0,
        fontFamily: 'Roboto',
        position: 'relative'
    },

    friendSent: {
        float: 'left',
        clear: 'both',
        padding: '10px 20px 18px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: 'white',
        color: theme.palette.text.primary,
        width: 'auto',
        maxWidth: '500px',
        borderRadius: '10px',
        borderTopLeftRadius: 0,
        fontFamily: 'Roboto',
        position: 'relative'
    },
    time: {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        fontSize: '10px'
    },
    messageContainer: {
        clear: 'both',
        paddingTop: '35px'
    },
    divider: {
        width: '60%',
        position: 'relative',
        background: 'linear-gradient(90deg, rgba(220,220,220,1) 0%, rgba(173,173,173,1) 50%, rgba(220,220,220,1) 100%)',
        margin: '0 auto 35px',
        height: '1px',
    },
    dividerDate: {
        margin: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#dcdcdc',
        padding: '0 20px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: '12px',
        color: '#7d7d7d',
    },
});

export default styles;