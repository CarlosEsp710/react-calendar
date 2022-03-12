import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import {
  startCheckTokenAction,
  startLoginAction,
  startRegisterAction,
} from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("test auth actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("should work startLoginAction if send a valid email and password", async () => {
    await store.dispatch(startLoginAction("carlos@gmail.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    //const token = localStorage.setItem.mock.calls[0][1];
  });

  test("should return error if startLoginAction receive an invalid credentials", async () => {
    await store.dispatch(startLoginAction("carlos", "123456"));

    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
  });

  test("should work startRegisterAction if send valid credentials", async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          email: "email@email.com",
          name: "Test",
          token: "token",
        };
      },
    }));

    await store.dispatch(
      startRegisterAction("Test", "test@test.com", "123456")
    );

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authRegister,
      payload: {
        uid: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("should work startCheckTokenAction if there is a token in localStorage", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          email: "email@email.com",
          name: "Test",
          token: "token",
        };
      },
    }));

    await store.dispatch(startCheckTokenAction());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
  });
});
