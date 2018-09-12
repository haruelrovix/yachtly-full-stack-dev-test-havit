import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions';
import { toggleModal } from '../../actions/modalActions';
import LoadingSpinner from '../loading/LoadingSpinner';
import InputForm from '../input/InputForm';
import User from './user';
import style from './style';

const name = 'name';
const email = 'email';
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const success = 'has-success';
const danger = 'has-danger';

class UserItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: new User(props.user),
      isDisplayed: !!props.match.params.id,
      validate : {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user && !nextProps.error.isDisplayed && !this.props.error.isDisplayed) {
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
        isDisplayed,
        validate: {}
      });
    } else if (nextProps.error.isDisplayed && nextProps.error.isDisplayed !== this.props.error.isDisplayed) {
      const { error } = nextProps.error;
      if (/email/i.test(error)) {
        const validate = { ...this.state.validate };
        validate.emailState = danger;

        this.setState({ validate });
      }
    }
  }

  deleteUser = () => {
    this.props.history.goBack();

    this.props.actions.deleteUser(this.state.user, this.props.history);
  }

  showModal = e => {
    e.preventDefault();

    this.props.toggleModal({
      onConfirm: this.deleteUser
    });
  }

  handleOnChange = target => {
    this.setState({ user: { ...this.state.user, [target.name]: target.value } })
  }

  handleOnBlur = target => {
    const validate = { ...this.state.validate }

    if (target.name === email) {
      validate.emailState = emailRegex.test(target.value) ? success : danger;
    } else if (target.name === name) {
      validate.nameState = target.value.length === 0 ? danger : success;
    }

    this.setState({ validate })
  }

  saveUser = e => {
    e.preventDefault();

    const validate = { ...this.state.validate }

    if (!this.state.user.name) validate.nameState = danger;
    if (!this.state.user.email) validate.emailState = danger;

    this.setState({ validate });

    // Validate form
    const hasDanger = Object.entries(validate).find(state => state[1] === danger);

    // Submit form IF it has no field error
    if (!hasDanger) {
      const { actions: { saveUser, updateUser }, match: { params } } = this.props;
      if (params.id) {
        updateUser(this.state.user)
      } else {
        saveUser(this.state.user, this.props.history)
      }
    }
  }

  render() {
    const { user, isDisplayed, validate } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 border">
            <Form style={style.form}>
              {isDisplayed && <InputForm label="ID" name="id" user={user} handleOnChange={this.handleOnChange} disabled />}
              <InputForm
                label="Name"
                name={name}
                user={user}
                handleOnChange={this.handleOnChange}
                handleOnBlur={this.handleOnBlur}
                invalid={validate.nameState === danger}
                valid={validate.nameState === success}
                message="Name is required."
              />
              <InputForm
                label="Email"
                name={email}
                type="email"
                user={user}
                handleOnChange={this.handleOnChange}
                handleOnBlur={this.handleOnBlur}
                valid={validate.emailState === success}
                invalid={validate.emailState === danger}
                message="Please input a correct email."
              />
              <InputForm label="Phone Number" name="phoneNumber" user={user} handleOnChange={this.handleOnChange} />
              <InputForm label="Address" name="address" user={user} handleOnChange={this.handleOnChange} />
              <FormGroup>
                <Button color="primary" size="sm" onClick={this.saveUser} style={style.button} disabled={isLoading}>Save</Button>
                {isDisplayed && <Button color="primary" size="sm" onClick={this.showModal} style={style.button} disabled={isLoading}>Delete</Button>}
              </FormGroup>
            </Form>
          </div>
        </div>
        <LoadingSpinner isLoading={isLoading} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    toggleModal: bindActionCreators(toggleModal, dispatch)
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    user: state.users.find(user => user.id === Number(ownProps.match.params.id)) || {},
    isLoading: state.loading.isDisplayed,
    error: state.error
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserItem));
