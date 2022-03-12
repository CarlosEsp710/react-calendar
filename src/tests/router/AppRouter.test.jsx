import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { AppRouter } from "../../router/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test <AppRouter /> component", () => {
  test("should return public route if isAuthenticated is false", () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("should return private route if isAuthenticated is true", () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        uid: "123",
        name: "Carlos",
        email: "carlos@gmail.com",
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: false,
      },
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
