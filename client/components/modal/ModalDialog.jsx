import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions/modalActions';
import ConfirmationButton from './ConfirmationButton';

class ModalDialog extends React.PureComponent {
  toggle = (isCancel) => {
    const { toggleModal, onConfirm } = this.props;

    // Hide Modal
    toggleModal();

    // Execute onConfirm
    if (!isCancel && onConfirm) {
      onConfirm();
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isDisplayed} toggle={this.toggle} backdrop="static">
        <ModalBody>
          Are you sure you want to delete this user?
        </ModalBody>
        <ModalFooter>
          <ConfirmationButton toggleModal={this.toggle} />{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleModal: bindActionCreators(toggleModal, dispatch)
});

const mapStateToProps = ({ modal }) => ({
  isDisplayed: modal.isDisplayed,
  onConfirm: modal.onConfirm
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialog);
