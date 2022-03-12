import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  isAuthenticated: false,
  uid: null,
  name: null,
  email: null,
};

const newState = {
  isAuthenticated: true,
  uid: "123",
  name: "John Doe",
  email: "test@example.com",
};

describe("test authReducer", () => {
  test("should return initial state", () => {
    const state = authReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  // should set user in login and register action
  test("should set user in login and register action", () => {
    const loginState = authReducer(initialState, {
      type: types.authLogin,
      payload: newState,
    });
    expect(loginState).toEqual(newState);

    const registerState = authReducer(initialState, {
      type: types.authRegister,
      payload: newState,
    });
    expect(registerState).toEqual(newState);
  });

  test("should set isAuthenticated to false and delete user in logout action", () => {
    const logoutState = authReducer(newState, {
      type: types.authLogout,
    });
    expect(logoutState).toEqual(initialState);
  });
});
