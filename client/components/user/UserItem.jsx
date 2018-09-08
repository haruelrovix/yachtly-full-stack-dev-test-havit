import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const buttonStyle = { marginRight: '5px', marginBottom: '5px' };

class UserItem extends React.PureComponent {
  editUser = () => this.props.history.push(`/user/${this.props.user.id}`);

  render() {
    const { user } = this.props;

    return (
      <tr>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.address}</td>
        <td>
          <Button color="primary" size="sm" onClick={this.editUser} style={buttonStyle}>Edit</Button>
          <Button color="primary" size="sm" style={buttonStyle}>Delete</Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(UserItem);
