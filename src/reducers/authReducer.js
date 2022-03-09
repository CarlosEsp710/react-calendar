import { types } from "../types/types";

const initialState = {
  isAuthenticated: false,
  uid: null,
  name: null,
  email: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case types.authRegister:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case types.authCheckToken:
      return {
        ...state,
        isAuthenticated: false,
      };

    case types.authLogout:
      return initialState;

    default:
      return state;
  }
};
