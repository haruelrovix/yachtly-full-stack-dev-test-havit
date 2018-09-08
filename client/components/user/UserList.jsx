import React from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';

class UserList extends React.PureComponent {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.users.length > 0 && this.props.users.map(user => {
              return (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
                  <td>
                    <Button color="primary" size="sm">Edit</Button>{' '}
                    <Button color="primary" size="sm">Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	};
};

export default connect(mapStateToProps)(UserList);
