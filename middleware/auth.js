const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtKey'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
