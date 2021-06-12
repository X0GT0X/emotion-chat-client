import React from 'react';
import { PropTypes } from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TopBar from './components/TopBar/TopBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Theme from './utils/Theme';
import { requireNoAuthentication } from './components/Authentication/notAuthenticatedComponent';
import { requireAuthentication } from './components/Authentication/AuthenticatedComponent';
import configureStore from './store/configureStore';
import browserHistory from './utils/history';

/**
 * Provides styles object for App component.
 *
 * @return {object} Component styles.
 */
const styles = () => ({
  app: {
    height: '100%'
  }
});

/**
 * Represents an App component.
 *
 * @param props Component properties.
 * @return {JSX.Element}
 * @constructor
 */
const App = (props) => {
  const { classes } = props;
  const store = configureStore();
  const history = syncHistoryWithStore(browserHistory, store);

  return <div className={classes.app}>
    <Provider store={store}>
      <Theme>
        <TopBar/>
        <Router history={history}>
          <Switch>
            <Route
              exact path='/'
              component={requireAuthentication(Dashboard)}
            />
            <Route path='/login' component={requireNoAuthentication(Login)}/>
            <Route path='/register'
                   component={requireNoAuthentication(Register)}/>
          </Switch>
        </Router>
      </Theme>
    </Provider>
  </div>;
};

App.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(App);
