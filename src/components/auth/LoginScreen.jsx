import React from "react";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";
import { startLoginAction, startRegisterAction } from "../../actions/auth";

import "../../assets/styles/login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginForm, handleLoginInputChange, resetLogin] = useForm({
    loginEmail: "carlos@gmail.com",
    loginPassword: "123456",
  });

  const [registerForm, handleRegisterInputChange, resetRegister] = useForm({
    registerName: "Carlos",
    registerEmail: "carlos@gmail.com",
    registerPassword: "123456",
    registerConfirmPassword: "123456",
  });

  const { loginEmail, loginPassword } = loginForm;
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
  } = registerForm;

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(startLoginAction(loginEmail, loginPassword));
    resetLogin();
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    dispatch(
      startRegisterAction(registerName, registerEmail, registerPassword)
    );
    resetRegister();
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
