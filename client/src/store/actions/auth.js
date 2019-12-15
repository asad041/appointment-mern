import _ from 'lodash';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_APPOINTMENTS
} from './types';
import { SubmissionError } from 'redux-form';
import { setAlert } from './alert';

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth');
    dispatch({
      type: LOAD_USER,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = values => async disptach => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(values);

    const response = await axios.post('/api/users', body, config);
    disptach({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    disptach({
      type: REGISTER_FAIL
    });
    const { data } = error.response;
    if (data && data.errors) {
      const errors = {};
      _.map(data.errors, value => {
        errors[value.param] = value.msg;
      });
      throw new SubmissionError(errors);
    }
  }
};

export const login = values => async disptach => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(values);

    const response = await axios.post('/api/auth', body, config);
    disptach({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    const { data } = error.response;
    if (data && data.msg) {
      disptach(setAlert(data.msg, 'danger'));
    }
    disptach({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: RESET_APPOINTMENTS });
  dispatch({ type: LOGOUT });
};
