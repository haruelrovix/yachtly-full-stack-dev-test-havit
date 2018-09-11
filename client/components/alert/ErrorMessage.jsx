import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleErrorMessage } from '../../actions/errorActions';

const ErrorMessageStyle = { position: 'absolute', right: 0 }

class ErrorMessage extends React.PureComponent {
  onDismiss = () => {
    this.props.toggleErrorMessage();
  }

  render() {
    return (
      <Alert color="danger"
        isOpen={this.props.isDisplayed}
        toggle={this.onDismiss}
        style={ErrorMessageStyle}
      >
        {this.props.errorMessage}
      </Alert>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleErrorMessage: bindActionCreators(toggleErrorMessage, dispatch)
});

const mapStateToProps = ({ error }) => {
  return {
    isDisplayed: error.isDisplayed,
    errorMessage: error.error
  }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
