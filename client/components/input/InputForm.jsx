import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class InputForm extends React.PureComponent {
  handleOnChange = e => {
    this.props.handleOnChange(e.target)
  };

  render() {
    const { user, label, name, type, disabled } = this.props;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input
          type={type || 'text'}
          name={name}
          value={user[name]}
          onChange={this.handleOnChange}
          disabled={disabled}
        />
      </FormGroup>
    );
  }
}

export default InputForm;
