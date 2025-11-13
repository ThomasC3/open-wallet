/**
 * Authentication Middleware
 *
 * Validates JWT tokens and protects routes.
 */

const authenticate = (req, res, next) => {
  // In a real application, you would validate a JWT token here.
  // For this example, we'll just simulate an authenticated user.
  req.user = { id: 'user123', roles: ['user'] };
  next();
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.some(role => req.user.roles.includes(role))) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden'
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
