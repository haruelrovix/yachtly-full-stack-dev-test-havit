import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

const buttonStyle = { marginRight: '5px', marginBottom: '5px' };

class UserItem extends React.PureComponent {
  editUser = () => this.props.history.push(`/user/${this.props.user.id}`);

  deleteUser = () => this.props.actions.deleteUser(this.props.user);

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
          <Button color="primary" size="sm" onClick={this.deleteUser} style={buttonStyle}>Delete</Button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
};

export default withRouter(connect(null, mapDispatchToProps)(UserItem));
