import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/Avatar';

const ImageAvatar = (props) => (<Avatar
  className={props.className}
  src={props.src}
/>);

ImageAvatar.propTypes = {
  className: PropTypes.object,
  src: PropTypes.string
};

export default ImageAvatar;
