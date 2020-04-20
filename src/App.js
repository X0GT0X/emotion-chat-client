import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './components/TopBar';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Theme from "./Theme";
import browserHistory from './history';
import { Provider } from 'react-redux';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';
import { requireAuthentication } from './components/AuthenticatedComponent';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

const useStyles = makeStyles(() => ({
    app: {
      height: '100%',
    },
}));

function App() {

    const classes = useStyles();
    const store = configureStore();
    const history = syncHistoryWithStore(browserHistory, store);

    return <div className={'app ' + classes.app}>
        <Provider store={store}>
            <Theme>
                <TopBar/>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={requireAuthentication(Dashboard)}/>
                        <Route path='/login' component={requireNoAuthentication(Login)}/>
                        <Route path='/register' component={requireNoAuthentication(Register)}/>
                    </Switch>
                </Router>
            </Theme>
        </Provider>
    </div>
}

export default App;