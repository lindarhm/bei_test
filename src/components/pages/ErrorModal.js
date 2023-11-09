import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ErrorModal({ show, onClose, errorMessage }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Gagal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
