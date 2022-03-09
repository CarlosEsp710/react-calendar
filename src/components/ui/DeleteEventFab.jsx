import React from "react";

import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../actions/calendar";

import "../../assets/styles/fabs.css";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(deleteEventAction());

  return (
    <button className="btn btn-danger fab-danger" onClick={handleClick}>
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  );
};
