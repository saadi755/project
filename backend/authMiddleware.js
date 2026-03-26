const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect route — must be logged in
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      console.log('toek:',token)

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }

  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Authorize by role — must be owner
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role '${req.user.role}' is not authorized` });
    }
    next();
  };
};

module.exports = { protect, authorize };