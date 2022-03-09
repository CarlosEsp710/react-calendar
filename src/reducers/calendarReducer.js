import { types } from "../types/types";

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.calendarGetEvents:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.calendarAddEvent:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.calendarUpdateEvent:
      return {
        ...state,
        events: state.events.map((event) =>
          event.uid === action.payload.uid ? action.payload : event
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
          (event) => event.uid !== state.activeEvent.uid
        ),
        activeEvent: null,
      };

    case types.calendarClear:
      return initialState;

    default:
      return state;
  }
};
