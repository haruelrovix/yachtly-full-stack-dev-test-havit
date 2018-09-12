import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import UserItem from './UserItem';

const loaderStyle = { textAlign: 'center' };

class UserList extends React.PureComponent {
  editUser = id => console.log(id);

  render() {
    return (
      <Table hover striped>
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
            this.props.isLoading && <tr><td colSpan={6} style={loaderStyle}>
              <PulseLoader loading color='#007bff' size={5} />
            </td></tr>
          }
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
    users: state.users,
    isLoading: state.loading.isDisplayed
  };
};

export default connect(mapStateToProps)(UserList);
