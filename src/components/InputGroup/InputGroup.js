import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  input: {
    '&:hover:before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42) !important'
    }
  }
});

/**
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const InputGroup = (props) => {
  const { classes } = props;

  return (<FormControl
    required={props.required}
    fullWidth
    margin='normal'
  >
    <InputLabel htmlFor={props.inputId}>{props.label}</InputLabel>
    <Input
      type={props.type}
      className={classes.input}
      autoFocus
      onChange={(e) => props.onChange(props.field, e)}
      id={props.inputId}
    />
  </FormControl>);
};

InputGroup.propTypes = {
  inputId: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  classes: PropTypes.object,
  field: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default withStyles(styles)(InputGroup);
