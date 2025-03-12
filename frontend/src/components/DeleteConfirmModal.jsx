import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmModal({ openModal, setOpenModal, handleDelete }) {
  return (
    <Modal
      show={openModal}
      onHide={() => setOpenModal(false)}
      backdrop="static"
      centered
    >
      <Modal.Header>
        <Modal.Title>Delete task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the selected task?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" type="submit" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
