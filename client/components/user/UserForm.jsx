import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

import User from './user';
import InputForm from './InputForm';

class UserItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: new User(props.user),
      isSaving: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user && nextProps.user.id) {
      this.setState({ user: nextProps.user, isSaving: false });
    }
  }

  goBack = () => this.props.history.goBack();

  handleOnChange = target => {
    this.setState({ user: { ...this.state.user, [target.name]: target.value } })
  };

  saveUser = e => {
    e.preventDefault();

    this.setState({ isSaving: true });

    this.props.actions.updateUser(this.state.user);
  }

  render() {
    const { user, isSaving } = this.state;

    return (
      <Form>
        <InputForm label="ID" name="id" user={user} handleOnChange={this.handleOnChange} disabled />
        <InputForm label="Name" name="name" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Email" name="email" type="email" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Phone Number" name="phoneNumber" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Address" name="address" user={user} handleOnChange={this.handleOnChange} />
        <FormGroup>
          {isSaving ? 'Saving...' : <Button color="primary" size="sm" onClick={this.saveUser}>Save</Button>}{' '}
          <Button color="primary" size="sm" onClick={this.goBack}>Cancel</Button>
        </FormGroup>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.users.find(user => user.id === Number(ownProps.match.params.id)) || {}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserItem));
