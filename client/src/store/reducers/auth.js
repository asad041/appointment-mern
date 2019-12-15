import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const inititalState = {
  token: localStorage.token,
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state = inititalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null
      };

    default:
      return state;
  }
};
