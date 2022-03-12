import React from "react";

import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";

import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: "123",
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
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("test <CalendarScreen /> component", () => {
  test("should render <CalendarScreen />", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call some actions when clicked calendar", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop("onSelectEvent")({ start: "123" });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.calendarSetActiveEvent,
      payload: { start: "123" },
    });

    act(() => {
      calendar.prop("onView")("month");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "month");
    });
  });
});
