import React from 'react';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase }) => (
  <a href={ROUTES.LANDING} onClick={firebase.doSignOut}>
    <i className="material-icons">exit_to_app</i>
  </a>
);

export default withFirebase(SignOutButton);
