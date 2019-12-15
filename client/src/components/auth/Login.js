import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../store/actions';
import { LOGIN_FIELDS } from '../helper/fields';
import { validate } from '../helper/validator';
import { inputFieldWithIcon } from '../layout/FormFields';
import SubmitButton from '../layout/SubmitButton';
import Alert from '../layout/Alert';

const Login = ({ submitting, valid, handleSubmit, login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container'>
      <section className='section'>
        <div className='columns'>
          <div className='column is-6 is-offset-3'>
            <div className='box'>
              <h3 className='has-text-centered subtitle'>Welcome back!</h3>
              <Alert />
              <form onSubmit={handleSubmit(values => login(values))}>
                {_.map(LOGIN_FIELDS, (value, key) => (
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
                <div className='field'>
                  <div className='control is-flex-center is-small'>
                    <Link to='/register'>Don't have an account?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
};

const LoginWithReduxForm = reduxForm({
  form: 'login',
  fields: _.keys(LOGIN_FIELDS),
  fieldsRules: LOGIN_FIELDS,
  validate
})(Login);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginWithReduxForm);
