import {
  GET_SLOT,
  NO_SLOT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT
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

    default:
      return state;
  }
};
