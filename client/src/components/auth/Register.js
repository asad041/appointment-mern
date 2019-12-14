import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../store/actions';
import { inputFieldWithIcon } from '../layout/FormFields';
import SubmitButton from '../layout/SubmitButton';
import { REGISTER_FIELDS } from '../helper/fields';
import { validate } from '../helper/validator';

const Register = ({
  submitting,
  valid,
  handleSubmit,
  register,
  isAuthenticated
}) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container'>
      <section className='section'>
        <div className='columns'>
          <div className='column is-4 is-offset-4'>
            <div className='box'>
              <form onSubmit={handleSubmit(values => register(values))}>
                {_.map(REGISTER_FIELDS, (value, key) => (
                  <Field
                    key={key}
                    type={value.type}
                    name={key}
                    placeholder={value.placeholder}
                    icon={value.icon}
                    required={value.required}
                    component={inputFieldWithIcon}
                  />
                ))}
                <SubmitButton
                  text='Create an account'
                  valid={valid}
                  submitting={submitting}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired
};

const RegisterWithReduxForm = reduxForm({
  form: 'register',
  fields: _.keys(REGISTER_FIELDS),
  fieldsRules: REGISTER_FIELDS,
  validate
})(Register);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(RegisterWithReduxForm);
