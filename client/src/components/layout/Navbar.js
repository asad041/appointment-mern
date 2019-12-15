import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';

const buttonStyle = {
  height: '2.25em',
  padding: 'calc(.375em - 1px) 1.5em'
};

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
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

  const authLinks = (
    <div className='field is-grouped is-grouped-multiline'>
      <p className='control'>
        <Link to='/dashboard' className='button is-primary' style={buttonStyle}>
          <span className='icon'>
            <i className='fa fa-user'></i>
          </span>
          <strong>Dashboard</strong>
        </Link>
      </p>
      <p className='control'>
        <button onClick={logout} className='button is-light has-icons'>
          <span className='icon'>
            <i className='fa fa-sign-in-alt'></i>
          </span>
          <span>Logout</span>
        </button>
      </p>
    </div>
  );

  return (
    <nav
      className='navbar has-shadow is-spaced'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='container'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <b>Appointments</b>
          </Link>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <Link to='/all' className='navbar-item'>
              All requests
            </Link>
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              {!loading && (isAuthenticated ? authLinks : guestLinks)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
