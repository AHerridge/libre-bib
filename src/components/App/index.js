import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import BookDetails from '../Books/BookDetails';
import ScanPage from '../Scanner/ScanPage';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import '../../../node_modules/materialize-css/dist/css/materialize.css';
import '../../../node_modules/materialize-css/dist/js/materialize.js';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <div className="container">
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.BOOK_DETAILS} component={BookDetails} />
        <Route path={ROUTES.SCAN} component={ScanPage} />
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
