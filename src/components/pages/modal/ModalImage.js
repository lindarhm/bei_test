import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalImage({ show, onClose, message, imageUrl }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        <br />
        {imageUrl && (
          <img className="modal-body img" src={`data:image/jpeg;base64, ${imageUrl}`} alt="Image" />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalImage;






