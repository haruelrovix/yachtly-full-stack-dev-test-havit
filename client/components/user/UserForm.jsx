import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

import User from './user';
import InputForm from '../input/InputForm';

class UserItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: new User(props.user),
      isDisplayed: !!props.match.params.id,
      isSaving: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      let user;
      let isDisplayed;
      
      if (nextProps.users.length !== this.props.users.length) {
        user = new User(nextProps.users[nextProps.users.length - 1]);
        isDisplayed = true;
      } else {
        user = new User(nextProps.user);
        isDisplayed = !!nextProps.match.params.id;
      }

      this.setState({
        user,
        isSaving: false,
        isDisplayed
      });
    }
  }

  deleteUser = e => {
    e.preventDefault();

    this.props.history.goBack();

    this.props.actions.deleteUser(this.state.user);
  }

  handleOnChange = target => {
    this.setState({ user: { ...this.state.user, [target.name]: target.value } })
  };

  saveUser = e => {
    e.preventDefault();

    this.setState({ isSaving: true });

    const { actions: { saveUser, updateUser }, match: { params } } = this.props;
    if (params.id) {
      updateUser(this.state.user)
    } else {
      saveUser(this.state.user)
    }
  }

  render() {
    const { user, isSaving, isDisplayed } = this.state;

    return (
      <Form>
        {isDisplayed && <InputForm label="ID" name="id" user={user} handleOnChange={this.handleOnChange} disabled />}
        <InputForm label="Name" name="name" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Email" name="email" type="email" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Phone Number" name="phoneNumber" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Address" name="address" user={user} handleOnChange={this.handleOnChange} />
        <FormGroup>
          {isSaving ? 'Saving...' : <Button color="primary" size="sm" onClick={this.saveUser}>Save</Button>}{' '}
          <Button color="primary" size="sm" onClick={this.deleteUser}>Delete</Button>
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
    users: state.users,
    user: state.users.find(user => user.id === Number(ownProps.match.params.id)) || {}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserItem));
