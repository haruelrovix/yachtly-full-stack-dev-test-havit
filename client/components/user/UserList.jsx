import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import UserItem from './UserItem';

class UserList extends React.PureComponent {
  editUser = id => console.log(id);

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
            this.props.users.length > 0 && this.props.users.map(user =>
              <UserItem key={user.id} user={user} editUser={this.editUser} />
            )
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
