import React, { useEffect, useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/es-mx";

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { Navbar } from "../ui/Navbar";
import {
  clearActiveEventAction,
  setActiveEventAction,
  startLoadingEventsAction,
} from "../../actions/calendar";
import { messages } from "../../helpers/calendar-messages-es";
import { openModalAction } from "../../actions/ui";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(startLoadingEventsAction());
  }, [dispatch]);

  const onDoubleClick = () => dispatch(openModalAction());

  const onSelectEvent = (event) => dispatch(setActiveEventAction(event));

  const onSelectSlotEvent = (event) => dispatch(clearActiveEventAction());

  const onViewChangeEvent = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      color: "white",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onView={onViewChangeEvent}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlotEvent}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />

      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
