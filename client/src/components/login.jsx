import React, { useState, useEffect } from "react";
import axios, * as others from "axios";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import PropTypes from "prop-types";
import Alert from "../components/layout/Alert";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  FormControl,
} from "react-bootstrap";
import Swal from "sweetalert2";
function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [personalShow, setPersonalShow] = useState(false);

  const showPersonal = () => setPersonalShow(true);

  const handlePersonalClose = () => {
    setPersonalShow(false);
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}></Tooltip>}>
        <button style={{backgroundColor:'#76d18f'}} className="btn" onClick={showPersonal}>
          Login
        </button>
      </OverlayTrigger>
      <Modal animation={false} show={personalShow} onHide={handlePersonalClose}>
        <Modal.Header
          className="bg-green-500 text-black-500"
          closeButton
          style={{ position: "relative" }}
        >
          <Modal.Title>Login</Modal.Title>
          <Button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 999,
              color: "black",
            }}
            variant="primary"
            onClick={handlePersonalClose}
          >
            x
          </Button>
        </Modal.Header>

        <Modal.Body>
          <section className="">
            <Alert />
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                login(formData.email, formData.password);
                if (isAuthenticated) {
                  handlePersonalClose();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }}
            >
              <div className="form-group">
                <div className="label">
                  <label className="label">Email</label>
                </div>
                <FormControl
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <div>
                  <label className="label">Password</label>
                </div>
                <FormControl
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <input
                type="submit"
                className="btn bg-green-500 btn-primary my-1"
              />
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
