import React from 'react';
import { Modal } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import style from './style';

const LoadingSpinner = ({ isLoading }) => {
  return (
    <Modal contentClassName="overlay" style={style.center} isOpen={isLoading}>
      <ClipLoader loading color="#007bff" size={25} />
    </Modal>
  );
};

export default LoadingSpinner;
