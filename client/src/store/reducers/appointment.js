import { GET_SLOT, NO_SLOT, GET_APPOINTMENTS } from '../actions';

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

    default:
      return state;
  }
};
