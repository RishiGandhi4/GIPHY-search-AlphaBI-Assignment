"use client";

import React, { useState } from "react";


import { auth } from "../../../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import Link from "next/link.js";

const Register = () => {

    const navigate = useRouter();

    const [values, setValues] = useState({
        name: "",
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
    
        const { name, email, password } = values;
    
        if (!name || !email || !password) {
          toast.error("Please enter All Fields", toastOptions);
        } else {
          try {
            // Create User
            const result = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
    
            console.log(result);
    
            toast.success("User has Registered Successfully", toastOptions);
    
            setValues({
              email: "",
              password: "",
              name: "",
            });
            localStorage.setItem("user", 1);
            navigate.push("/");
          } catch (err) {
            navigate.push("/login");
            toast.error(`Error Signing in ${err.message}`, toastOptions);
          }
        }
      };
  return (
    <Container
        className=""
        
      >
        <Row>
          <h1 className="text-center">
            {/* <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white"}}  className="text-center" /> */}
          </h1>
          <h1 className="text-center text-dark">Welcome to Giphy-Search</h1>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-dark text-center mt-5">Registration</h2>
            <Form>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
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
                  className=" text-center mt-3 btnStyle"
                  onClick={handleSubmit}
                >
                  Signup
                </Button>

                <p className="mt-3" color={{ color: "#343a40" }}>
                  Already have an account?{" "}
                  <Link href="/login" className="text-dark lnk">
                    Login
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

export default Register;
