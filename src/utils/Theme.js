import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0874ff'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200
    }
  },
});

/**
 * Represents Theme component.
 * Includes a ThemeProvider with custom theme options.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Theme = (props) => (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.any
};

export default Theme;
