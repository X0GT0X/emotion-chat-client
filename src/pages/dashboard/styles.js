const styles = theme => ({
    dashboard: {
        height: '100%',
        display: 'flex',
    },
    content: {
        marginTop: '64px',
        flexGrow: 1,
        maxHeight: '100%',
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
    },
    text: {
        color: '#737373',
    },
    chatViewContainer: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
    },
});

export default styles;