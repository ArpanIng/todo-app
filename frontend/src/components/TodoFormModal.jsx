import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function TodoFormModal({
  openModal,
  setOpenModal,
  initialData,
  onSubmit,
  todoPriorityChoices,
  todoStatusChoices,
  isEditMode = false,
}) {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long")
      .required("Name is required"),
    description: Yup.string().min(
      5,
      "Description must be at least 5 characters long"
    ),
    priority: Yup.string().required("Priority is required"),
    status: Yup.string().required("Status is required"),

    dueDate: Yup.date()
      .nullable()
      .notRequired()
      .test(
        "is-valid-date",
        "Due date must be a valid date",
        (value) => !value || !isNaN(new Date(value).getTime()) // Check if the date is valid
      ),

    isCompleted: Yup.boolean(),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleClose = () => {
    setOpenModal(false);
    resetForm();
  };

  return (
    <>
      <Modal
        id="todo-form-modal"
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="todo-form-modal-label"
      >
        <Modal.Header closeButton>
          <Modal.Title id="todo-form-modal-label">
            {isEditMode ? "Edit todo" : "Add a new todo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* name field */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              {/* priority field */}
              <Form.Group as={Col}>
                <Form.Label htmlFor="priority">Priority</Form.Label>
                <Form.Select
                  id="priority"
                  name="priority"
                  value={values.priority}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.priority && errors.priority}
                >
                  <option>Select priority</option>
                  {todoPriorityChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                {/* status field */}
                <Form.Label htmlFor="status">Status</Form.Label>
                <Form.Select
                  id="status"
                  name="status"
                  value={values.status}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.status && errors.status}
                >
                  <option>Select status</option>
                  {todoStatusChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* due date field */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="due-date">Due date</Form.Label>
              <Form.Control type="datetime-local" id="due-date" />
            </Form.Group>

            {/* description field */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                rows={5}
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditMode ? "Edit" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TodoFormModal;
