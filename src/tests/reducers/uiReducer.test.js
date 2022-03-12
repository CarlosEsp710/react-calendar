import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

const initialState = {
  modalOpen: false,
};

const openAction = {
  type: types.uiOpenModal,
};

const closeAction = {
  type: types.uiCloseModal,
};

describe("test uiReducer", () => {
  test("should return initial state", () => {
    const state = uiReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("should open and close modal", () => {
    const openState = uiReducer(initialState, openAction);
    expect(openState).toEqual({ modalOpen: true });

    const closeState = uiReducer(openState, closeAction);
    expect(closeState).toEqual({ modalOpen: false });
  });
});
