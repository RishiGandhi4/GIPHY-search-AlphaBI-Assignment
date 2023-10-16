"use client";

import React, { useState } from "react";

import { auth } from "../../../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import Link from "next/link.js";

const Login = () => {
  const navigate = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      toast.error("Please Enter all Details", toastOptions);
    } else {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        // Clear All Form Data
        setValues({
          email: "",
          password: "",
        });

        console.log(result);

        toast.success("User has successfully Logged In", toastOptions);

        navigate.push("/");
      } catch (err) {
        toast.error("Error Signing in", toastOptions);
      }
    }
  };
  return (
    <Container className="">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">
            {/* <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white"}}  className="text-center" /> */}
          </h1>
          <h2 className="text-dark text-center">Login</h2>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />
            </Form.Group>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              className="mt-4"
            >
              {/* <Link to="/forgotPassword" className="text-white lnk">
                  Forgot Password?
                </Link> */}

              <Button
                type="submit"
                className=" text-center mt-3 btnStyle"
                onClick={handleSubmit}
              >
                Login
              </Button>

              <p className="mt-3" color={{ color: "#343a40" }}>
                Don't Have an Account?{" "}
                <Link href="/register" className="text-dark lnk">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer style={{ zIndex: "2 !important" }} />
    </Container>
  );
};

export default Login;
