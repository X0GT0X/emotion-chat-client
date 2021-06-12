import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/Avatar';

const TextAvatar = (props) => (<Avatar className={props.className}>
  {
    (props.name ? props.name.charAt(0).toUpperCase() : '') + '' +
    (props.surname ? props.surname.charAt(0).toUpperCase() : '')
  }
</Avatar>);

TextAvatar.propTypes = {
  className: PropTypes.object,
  name: PropTypes.string,
  surname: PropTypes.string
};

export default TextAvatar;
