import React from "react";

import { useDispatch } from "react-redux";
import { startDeleteEventAction } from "../../actions/calendar";

import "../../assets/styles/fabs.css";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(startDeleteEventAction());

  return (
    <button className="btn btn-danger fab-danger" onClick={handleClick}>
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  );
};
