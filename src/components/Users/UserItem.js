import React from 'react';

import { withFirebase } from '../Firebase';

const UserItem = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
    </tr>
  );
};

export default withFirebase(UserItem);
