import React from "react";

import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";

import { types } from "../../../types/types";
import { CalendarModal } from "../../../components/calendar/CalendarModal";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: "123",
  },
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola",
      notes: "Hola",
      start: "2020-05-01T00:00:00.000Z",
      end: "2020-05-01T00:00:00.000Z",
    },
  },
  ui: {
    modalOpen: true,
  },
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("test <CalendarModal />", () => {
  test("should render <CalendarModal />", () => {
    expect(wrapper.find(".modal").exists()).toBe(true);
  });
});
