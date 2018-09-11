import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions';
import { toggleModal } from '../../actions/modalActions';
import style from './style';

class UserItem extends React.PureComponent {
  editUser = () => this.props.history.push(`/user/${this.props.user.id}`);

  deleteUser = () => this.props.actions.deleteUser(this.props.user);

  showModal = e => {
    e.preventDefault();

    this.props.toggleModal({
      onConfirm: this.deleteUser
    });
  }

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
          <Button color="primary" size="sm" onClick={this.editUser} style={style.button}>Edit</Button>
          <Button color="primary" size="sm" onClick={this.showModal} style={style.button}>Delete</Button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(userActions, dispatch),
    toggleModal: bindActionCreators(toggleModal, dispatch)
	};
};

export default withRouter(connect(null, mapDispatchToProps)(UserItem));
