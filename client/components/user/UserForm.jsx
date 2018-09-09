import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

import User from './user';
import InputForm from '../input/InputForm';
import style from './style';

const email = 'email';
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class UserItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: new User(props.user),
      isDisplayed: !!props.match.params.id,
      isSaving: false,
      validate : {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      let user;
      let isDisplayed;
      
      if (nextProps.users.length !== this.props.users.length && this.props.users.length > 0) {
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
  }

  handleOnBlur = target => {
    if (target.name === email) {
      const validate = { ...this.state.validate }

      if (emailRegex.test(target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }

      this.setState({ validate })
    }
  }

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
    const { user, isSaving, isDisplayed, validate } = this.state;
    const invalidEmail = validate.emailState === 'has-danger';

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 border">
            <Form style={style.form}>
              {isDisplayed && <InputForm label="ID" name="id" user={user} handleOnChange={this.handleOnChange} disabled />}
              <InputForm label="Name" name="name" user={user} handleOnChange={this.handleOnChange} />
              <InputForm
                label="Email"
                name="email"
                type="email"
                user={user}
                handleOnChange={this.handleOnChange}
                handleOnBlur={this.handleOnBlur}
                valid={validate.emailState === 'has-success'}
                invalid={invalidEmail}
              />
              <InputForm label="Phone Number" name="phoneNumber" user={user} handleOnChange={this.handleOnChange} />
              <InputForm label="Address" name="address" user={user} handleOnChange={this.handleOnChange} />
              <FormGroup>
                {isSaving ? 'Saving...' : <Button color="primary" size="sm" onClick={this.saveUser} style={style.button}>Save</Button>}
                {isDisplayed && <Button color="primary" size="sm" onClick={this.deleteUser} style={style.button}>Delete</Button>}
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
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
