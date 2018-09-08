import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class UserList extends React.PureComponent {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.users.length > 0 && this.props.users.map((user, idx) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
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
