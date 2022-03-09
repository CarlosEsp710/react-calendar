import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Modal from "react-modal/lib/components/Modal";
import Swal from "sweetalert2";

import { closeModalAction } from "../../actions/ui";
import {
  startAddEventAction,
  clearActiveEventAction,
  startUpdateEventAction,
} from "../../actions/calendar";

import "../../assets/styles/date_picker.css";
import "../../assets/styles/modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initialFormState = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());

  const [inputValid, setInputValid] = useState({
    validTitle: true,
    validNotes: true,
  });

  const { validTitle, validNotes } = inputValid;

  const [formValues, setFormValues] = useState(initialFormState);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) =>
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });

  const closeModal = () => {
    setFormValues(initialFormState);
    dispatch(clearActiveEventAction());
    dispatch(closeModalAction());
  };

  const handleChangeStartDate = (event) => {
    setDateStart(event);
    setFormValues({ ...formValues, start: event });
  };

  const handleChangeEndDate = (event) => {
    setDateEnd(event);
    setFormValues({ ...formValues, end: event });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Ups!",
        "La fecha de finalización debe ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setInputValid({
        ...inputValid,
        validTitle: false,
      });
    }

    if (notes.trim().length < 2) {
      return setInputValid({
        ...inputValid,
        validNotes: false,
      });
    }

    if (activeEvent) {
      dispatch(startUpdateEventAction(formValues));
    } else {
      dispatch(startAddEventAction(formValues));
    }

    setInputValid({
      validTitle: true,
      validNotes: true,
    });

    closeModal();
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      style={customStyles}
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className="form-control"
            onChange={handleChangeStartDate}
            value={dateStart}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            onChange={handleChangeEndDate}
            value={dateEnd}
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!validTitle && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className={`form-control ${!validNotes && "is-invalid"}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            autoComplete="off"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block mb-3"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
