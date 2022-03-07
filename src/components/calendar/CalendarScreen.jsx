import React, { useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es-mx";

import { CalendarEvent } from "./CalendarEvent";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Cumpleaños",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    user: {
      _id: "123",
      name: "Carlos",
    },
  },
];

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (event) => {
    console.log(event);
  };

  const onSelectEvent = (event) => {
    console.log(event);
  };

  const onViewChangeEvent = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
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
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
    </div>
  );
};
