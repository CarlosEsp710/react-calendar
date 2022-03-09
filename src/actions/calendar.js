import Swal from "sweetalert2";

import { fetchWithToken } from "../helpers/fetch";
import { loadEvents } from "../helpers/loadEvents";
import { types } from "../types/types";

export const startLoadingEventsAction = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("events", "GET", {});
    const data = await res.json();

    if (data.ok) {
      const events = loadEvents(data.events);
      dispatch(loadEventsAction(events));
    } else {
      Swal.fire("Error", data.msg, "error");
    }
    try {
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

const loadEventsAction = (events) => ({
  type: types.calendarGetEvents,
  payload: events,
});

export const startAddEventAction = (event) => {
  return async (dispatch, getState) => {
    const { uid, name, email } = getState().auth;

    try {
      const res = await fetchWithToken("events", "POST", event);
      const data = await res.json();

      if (data.ok) {
        event.uid = data.event.uid;
        event.user = { uid, name, email };
        dispatch(addEventAction(event));
      } else {
        Swal.fire("Error", data.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

const addEventAction = (event) => ({
  type: types.calendarAddEvent,
  payload: event,
});

export const startUpdateEventAction = (event) => {
  return async (dispatch, getState) => {
    const { uid, name, email } = getState().auth;

    try {
      const res = await fetchWithToken(`events/${event.uid}`, "PUT", event);
      const data = await res.json();

      if (data.ok) {
        event.uid = data.event.uid;
        event.user = { uid, name, email };
        dispatch(updateEventAction(event));
      } else {
        Swal.fire("Error", data.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

const updateEventAction = (event) => ({
  type: types.calendarUpdateEvent,
  payload: event,
});

export const startDeleteEventAction = (event) => {
  return async (dispatch, getState) => {
    const { activeEvent } = getState().calendar;

    try {
      const res = await fetchWithToken(
        `events/${activeEvent.uid}`,
        "DELETE",
        event
      );
      const data = await res.json();

      if (data.ok) {
        dispatch(deleteEventAction(event));
      } else {
        Swal.fire("Error", data.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

const deleteEventAction = () => ({
  type: types.calendarDeleteEvent,
});

export const setActiveEventAction = (event) => ({
  type: types.calendarSetActiveEvent,
  payload: event,
});

export const clearActiveEventAction = () => ({
  type: types.calendarClearActiveEvent,
});

export const clearCalendarAction = () => ({
  type: types.calendarClear,
});
