import {
  GET_SLOT,
  SAVE_SLOT,
  NO_SLOT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
  RESET_APPOINTMENTS
} from '../actions';

const inititalState = {
  appointments: [],
  appointment: null,
  slot: null,
  loading: true
};

export default (state = inititalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SLOT:
    case SAVE_SLOT:
      return {
        ...state,
        slot: payload,
        loading: false
      };

    case NO_SLOT:
      return {
        ...state,
        slot: null,
        loading: false
      };

    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
        loading: false
      };

    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment._id === payload._id ? payload : appointment
        ),
        loading: false
      };

    case RESET_APPOINTMENTS:
      return inititalState;

    default:
      return state;
  }
};
