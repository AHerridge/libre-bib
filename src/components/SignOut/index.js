import React from 'react';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase }) => (
  <a href={ROUTES.LANDING} onClick={firebase.doSignOut}>
    <img
      width="40"
      height="40"
      alt="logout icon"
      src="https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-3/24/018_128_arrow_exit_logout-512.png"
    />
  </a>
);

export default withFirebase(SignOutButton);
