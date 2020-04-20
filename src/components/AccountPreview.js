import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    listItem: {
        position: 'relative',
        '&.Mui-selected': {
            backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
        }
    },
    pointedListItem: {
        position: 'relative',
        cursor: 'pointer',
        '&.Mui-selected': {
            backgroundColor: 'rgba(8, 116, 255, 0.2) !important'
        }
    },
    time: {
        fontSize: '12px',
        fontFamily: "'Roboto', sans-serif",
        position: 'absolute',
        right: '16px',
        top: '14px',
        color: theme.palette.text.secondary
    },
    avatar: {
        // border: '2px solid',
        borderColor: theme.palette.text.disabled,
    },
}));


export default function AccountPreview(props) {

    const user = props.user;
    const styles = useStyles();

    if(user)
        return (
            <ListItem
                className={props.handleClick ? styles.pointedListItem : styles.listItem}
                onClick={props.handleClick ? () => props.handleClick(user.login) : null}
                button={!!props.handleClick}
                selected={props.selected}
            >
                <ListItemAvatar>
                    {
                        user.profile_image ? <Avatar
                                src={'http://localhost:5000' + user.profile_image}
                                className={styles.avatar}
                            /> :
                            <Avatar className={styles.avatar}>
                            {user.name.charAt(0).toUpperCase() + '' + (user.surname ? user.surname.charAt(0).toUpperCase() : '')}
                        </Avatar>
                    }
                </ListItemAvatar>
                <ListItemText
                    primary={<b>{user.name + ' ' + (user.surname ? user.surname : '')}</b>}
                    secondary={
                        <React.Fragment>
                            {user.login}
                        </React.Fragment>
                    }
                />
            </ListItem>
        );
    else return null;
}