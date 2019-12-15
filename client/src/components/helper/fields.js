export const REGISTER_FIELDS = {
  name: {
    type: 'text',
    required: true,
    icon: 'user',
    placeholder: 'Fullname'
  },
  email: {
    type: 'email',
    required: true,
    icon: 'envelope',
    placeholder: 'Email address'
  },
  password: {
    type: 'password',
    required: true,
    icon: 'lock',
    placeholder: 'Password'
  }
};
export const LOGIN_FIELDS = {
  email: {
    type: 'email',
    required: true,
    icon: 'envelope',
    placeholder: 'Email address'
  },
  password: {
    type: 'password',
    required: true,
    icon: 'lock',
    placeholder: 'Password'
  }
};
export const SLOT_FIELDS = {
  total: {
    type: 'number',
    required: true,
    icon: 'list',
    placeholder: 'Total slots'
  },
  description: {
    type: 'text',
    icon: 'bullhorn',
    placeholder: 'Description (Optional)'
  }
};
