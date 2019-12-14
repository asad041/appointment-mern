import React from 'react';

export const renderHelper = ({ touched, error, right = true }) => {
  if (!(touched && error)) {
    return;
  }
  return (
    <p className={`help is-danger ` + (right && `has-text-right`)}>{error}</p>
  );
};

export const inputFieldWithIcon = ({
  input,
  icon,
  type,
  placeholder,
  required,
  meta: { touched, error }
}) => (
  <div className='field'>
    <div className='control has-icons-left'>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={'input' + (touched && error ? ' is-danger' : '')}
        required={required ? required : false}
      />
      <span className='icon is-left'>
        <i className={`fas fa-${icon}`}></i>
      </span>
    </div>
    {renderHelper({ touched, error })}
  </div>
);
