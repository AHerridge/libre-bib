import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import UserItem from './UserItem';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];

        snapshot.forEach(doc =>
          users.push({ ...doc.data(), id: doc.id }),
        );

        this.setState({
          users,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <table className="highlight">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withFirebase(UserList);
