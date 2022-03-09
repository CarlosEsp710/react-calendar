import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLoginAction = (email, password) => {
  return async (dispatch) => {
    const res = await fetchWithoutToken("auth/login", "POST", {
      email,
      password,
    });

    const data = await res.json();

    if (data.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        loginAction({
          uid: data.uid,
          email: data.email,
          name: data.name,
        })
      );
    } else {
      Swal.fire("Error", data.msg, "error");
    }
  };
};

const loginAction = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startRegisterAction = (name, email, password) => {
  return async (dispatch) => {
    const res = await fetchWithoutToken("auth/register", "POST", {
      name,
      email,
      password,
    });

    const data = await res.json();

    if (data.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        registerAction({
          uid: data.uid,
          email: data.email,
          name: data.name,
        })
      );
    } else {
      Swal.fire("Error", data.msg, "error");
    }
  };
};

const registerAction = (user) => ({
  type: types.authRegister,
  payload: user,
});

export const startCheckTokenAction = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("auth/renew-token", "GET", {});
    const data = await res.json();

    if (data.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        loginAction({
          uid: data.uid,
          email: data.email,
          name: data.name,
        })
      );
    } else {
      Swal.fire("Error", data.msg, "error");
      dispatch(checkTokenAction());
    }
  };
};

const checkTokenAction = () => ({
  type: types.authCheckToken,
});

export const startLogoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");

    dispatch(logoutAction());
  };
};

const logoutAction = () => ({
  type: types.authLogout,
});
