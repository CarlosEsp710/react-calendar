import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLoginAction } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startLoginAction: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("test <LoginScreen /> component", () => {
  test("should render <LoginScreen /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call startLoginAction", () => {
    wrapper
      .find("form")
      .at(0)
      .simulate("submit", {
        preventDefault: () => {},
      });

    expect(startLoginAction).toHaveBeenCalled();
  });
});
