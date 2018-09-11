import React from 'react';
import { Button } from 'reactstrap';

class ConfirmationButton extends React.PureComponent {
  toggle = () => {
    this.props.toggleModal(false);
  }

  render() {
    return (
      <Button color="Primary" onClick={this.toggle}>Confirm</Button>
    );
  }
}

export default ConfirmationButton;
