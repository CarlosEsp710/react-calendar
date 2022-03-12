import React from "react";

import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { DeleteEventFab } from "../../../components/ui/DeleteEventFab"; 
import { startDeleteEventAction } from "../../../actions/calendar";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

const store = mockStore(initialState);
store.dispatch = jest.fn();
jest.mock("../../../actions/calendar", () => ({
  startDeleteEventAction: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("test <DeleteEventFab /> component", () => {
  test("should return <DeleteEventFab /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch startDeleteEventAction when button is clicked", () => {
    wrapper.find("button").simulate("click");

    expect(startDeleteEventAction).toHaveBeenCalled();
  });
});
