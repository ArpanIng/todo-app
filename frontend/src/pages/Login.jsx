import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 8 characters")
      .required("Password is required"),
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
      try {
        await handleLogin(values);
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
        {/* general error */}
        {errors.detail && (
          <div className="py-2 text-danger">{errors.detail}</div>
        )}
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
          {/* password field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
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
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
