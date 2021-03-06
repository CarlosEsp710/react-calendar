import React from "react";

import { useDispatch } from "react-redux";

import { openModalAction } from "../../actions/ui";

import "../../assets/styles/fabs.css";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(openModalAction());

  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
