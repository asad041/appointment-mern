import _ from 'lodash';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { SubmissionError } from 'redux-form';

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
