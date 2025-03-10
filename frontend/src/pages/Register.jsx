import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { handleUserRegister } = useContext(AuthContext);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username can be at most 20 characters long")
      .required("Username is required"),

    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        await handleUserRegister(values);
      } catch (error) {
        actions.setErrors(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="vstack">
        <Form onSubmit={handleSubmit}>
          {/* username field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.username && errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          {/* email field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          {/* password field */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.password && errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {/* confirm password field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
            <Form.Control
              id="confirm-password"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.confirmPassword && errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
