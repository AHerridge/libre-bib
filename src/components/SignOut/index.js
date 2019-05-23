import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a href="#" onClick={firebase.doSignOut}>
    <img width="40" height="40" src="https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-3/24/018_128_arrow_exit_logout-512.png"></img>
  </a>
);

export default withFirebase(SignOutButton);
