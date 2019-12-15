import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import configureStore from './store';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

const useStyles = makeStyles(theme => ({
  appBarSpacer: {
    marginTop: 64,
    marginBottom: 64
  },
}));

function App () {
  const classes = useStyles();
    return (
      <Provider store={configureStore()}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Router>
            <React.Fragment>
              <Header />
              <div className={classes.appBarSpacer}>
                <Routes />
              </div>
              <Footer />
            </React.Fragment>
          </Router>
        </ThemeProvider>
      </Provider>
       
    )
}

export default App;