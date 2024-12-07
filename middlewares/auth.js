function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/login');
}

module.exports = isAuthenticated;
