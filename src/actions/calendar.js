import { types } from "../types/types";

export const addEventAction = (event) => ({
  type: types.calendarAddEvent,
  payload: event,
});

export const updateEventAction = (event) => ({
  type: types.calendarUpdateEvent,
  payload: event,
});

export const setActiveEventAction = (event) => ({
  type: types.calendarSetActiveEvent,
  payload: event,
});

export const clearActiveEventAction = () => ({
  type: types.calendarClearActiveEvent,
});

export const deleteEventAction = () => ({
  type: types.calendarDeleteEvent,
});
