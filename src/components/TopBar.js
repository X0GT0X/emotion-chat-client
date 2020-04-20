import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    header: {
        zIndex: theme.zIndex.drawer + 1,
    },
    container: {
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        flexGrow: 1,
    },
}));

function mapStateToProps(state) {
    return {
        isFetching: state.data.isFetching,
        isAuthenticating: state.auth.isAuthenticating,
        isRegistering: state.auth.isRegistering,
        isChatsFetching: state.chats.isFetching,
        isAddingChat: state.chats.isAddingChat,
    };
}

const mapDispatchToProps = (dispatch) => ({});

function TopBar(props) {
    const classes = useStyles();

    const isDataLoading = () => props.isFetching || props.isAuthenticating ||
        props.isRegistering || props.isChatsFetching || props.isAddingChat;

    return (
        <AppBar position="fixed" className={classes.header}>
            <div className={classes.container}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Chat App
                    </Typography>
                </Toolbar>
            </div>
            {
                isDataLoading() ? <LinearProgress color="secondary"/> : null
            }
        </AppBar>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)