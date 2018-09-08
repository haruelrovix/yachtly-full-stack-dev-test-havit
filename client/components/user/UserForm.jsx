import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import User from './user';
import InputForm from './InputForm';

class UserItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: new User(props.user)
    }
  }

  editUser = () => this.props.editUser(this.props.user.id);

  handleOnChange = target => {
    this.setState({ user: { ...this.state.user, [target.name]: target.value } })
  };

  render() {
    const { user } = this.state;

    return (
      <Form>
        <InputForm label="ID" name="id" user={user} handleOnChange={this.handleOnChange} disabled />
        <InputForm label="Name" name="name" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Email" name="email" type="email" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Phone Number" name="phoneNumber" user={user} handleOnChange={this.handleOnChange} />
        <InputForm label="Address" name="address" user={user} handleOnChange={this.handleOnChange} />
        <FormGroup>
          <Button color="primary" size="sm" onClick={this.editUser}>Save</Button>{' '}
          <Button color="primary" size="sm">Cancel</Button>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.users.find(user => user.id === Number(ownProps.match.params.id)) || {}
	};
};

export default withRouter(connect(mapStateToProps)(UserItem));
