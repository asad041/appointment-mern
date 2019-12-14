import _ from 'lodash';

export const validate = (values, { fieldsRules }) => {
  const errors = {};

  _.each(fieldsRules, (field, index) => {
    const { type, required, placeholder } = field;

    if (required && !values[index]) {
      errors[index] = `${placeholder} is required`;
    } else if (
      type === 'password' &&
      values[index] &&
      !/^(?=.*[a-zA-Z])(?=.*\d)[0-9a-zA-Z!@#$%^&*?]{6,20}$/.test(
        values[index].trim()
      )
    ) {
      errors[
        index
      ] = `${placeholder} must be 6 chars long (include number and special chars)`;
    } else if (
      type === 'email' &&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values[index].trim()
      )
    ) {
      errors[index] = `Invalid ${placeholder}`;
    }
  });

  return errors;
};
