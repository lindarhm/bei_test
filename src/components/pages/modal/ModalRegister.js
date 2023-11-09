import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalRegister({ show, onClose, message }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrasi Berhasil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRegister;
