import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const buttonStyle = {
  height: '2.25em',
  padding: 'calc(.375em - 1px) 1.5em'
};

const Navbar = props => {
  const guestLinks = (
    <div className='field is-grouped is-grouped-multiline'>
      <p className='control'>
        <Link to='/register' className='button is-primary' style={buttonStyle}>
          <span className='icon'>
            <i className='fa fa-user-plus'></i>
          </span>
          <strong>Register</strong>
        </Link>
      </p>
      <p className='control'>
        <Link to='/login' className='button is-light' style={buttonStyle}>
          <span className='icon'>
            <i className='fa fa-sign-in-alt'></i>
          </span>
          <span>Login</span>
        </Link>
      </p>
    </div>
  );

  return (
    <nav
      className='navbar has-shadow is-spaced'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <Link to='/' className='navbar-item'>
          <b>Booking Appointment</b>
        </Link>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'>
          <div className='navbar-item'>{guestLinks}</div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
