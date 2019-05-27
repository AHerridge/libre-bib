import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { UserList } from '../Users';
import * as ROLES from '../../constants/roles';

import Loans from '../Loans';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Loans all="true" />
    <UserList />
  </div>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition))(AdminPage);
