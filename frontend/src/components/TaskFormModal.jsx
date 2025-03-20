import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import {
  BsBell,
  BsBriefcase,
  BsCalendar,
  BsTextLeft,
  BsXLg,
} from "react-icons/bs";

function TaskFormModal({
  openModal,
  setOpenModal,
  initialData,
  onSubmit,
  taskPriorityChoices,
  taskStatusChoices,
  notificationTypeChoices,
  notificationTimeUnitChoices,
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
      resetForm();
    },
  });

  const handleClose = () => {
    setOpenModal(false);
    resetForm();
  };

  return (
    <>
      <Modal
        id="task-form-modal"
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="task-form-modal-label"
      >
        <Modal.Header closeButton>
          <Modal.Title id="task-form-modal-label">
            {isEditMode ? "Edit task" : "Add a new task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* name field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="name" column sm={1}>
                Name
              </Form.Label>
              <Col sm={11}>
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
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                <BsBriefcase />
              </Form.Label>

              {/* priority field */}
              <Col sm={5}>
                <Form.Select
                  id="priority"
                  name="priority"
                  value={values.priority}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.priority && errors.priority}
                >
                  <option>Select priority</option>
                  {taskPriorityChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Col>

              {/* status field */}
              <Col sm={5}>
                <Form.Select
                  id="status"
                  name="status"
                  value={values.status}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.status && errors.status}
                >
                  <option>Select status</option>
                  {taskStatusChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* due date field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="due-date" column sm={1}>
                <BsCalendar />
              </Form.Label>
              <Col sm={11}>
                <Form.Control type="date" id="due-date" />
              </Col>
            </Form.Group>

            {/* notification fields */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                <BsBell />
              </Form.Label>

              {/* notification type field */}
              <Col sm={4}>
                <Form.Select>
                  <option>Select type</option>
                  {notificationTypeChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              {/* notification time value field */}
              <Col sm={2}>
                <Form.Control type="number" />
              </Col>

              {/* notification time unit field */}
              <Col sm={3}>
                <Form.Select>
                  <option>Select unit</option>
                  {notificationTimeUnitChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col sm={1}>
                <Button variant="light">
                  <BsXLg />
                </Button>
              </Col>
            </Form.Group>

            {/* description field */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="description" column sm={1}>
                <BsTextLeft />
              </Form.Label>
              <Col sm={11}>
                <Form.Control
                  as="textarea"
                  id="description"
                  rows={5}
                  name="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.description && errors.description}
                  placeholder="Add description"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Col>
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

export default TaskFormModal;
