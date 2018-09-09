import React from 'react';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';

class InputForm extends React.PureComponent {
  handleOnChange = e => {
    this.props.handleOnChange(e.target)
  };

  handleOnBlur = e => {
    if (this.props.handleOnBlur) this.props.handleOnBlur(e.target)
  }

  render() {
    const { user, label, name, type, disabled, valid, invalid } = this.props;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input
          type={type || 'text'}
          name={name}
          value={user[name]}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          disabled={disabled}
          valid={valid}
          invalid={invalid}
        />
        <FormFeedback invalid='true'>Please input a correct {name}.</FormFeedback>
      </FormGroup>
    );
  }
}

export default InputForm;
