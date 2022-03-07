import moment from "moment";

import { types } from "../types/types";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "Cumpleaños",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#fafafa",
      user: {
        _id: "123",
        name: "Carlos",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.calendarAddEvent:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.calendarUpdateEvent:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case types.calendarSetActiveEvent:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.calendarClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case types.calendarDeleteEvent:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    default:
      return state;
  }
};
