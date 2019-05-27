import React from 'react';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => (
  <Link to={ROUTES.LANDING} onClick={firebase.doSignOut}>
    <i className="material-icons">exit_to_app</i>
  </Link>
);

export default withFirebase(SignOutButton);
