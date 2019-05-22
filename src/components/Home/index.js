import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Loans from '../Loans';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Loans />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
