const passport = require("passport");

exports.googleAuth = passport.authenticate('google',{
  scope: ['profile', 'email'],
});

exports.googleAuthCallback = passport.authenticate('google',{
  failureRedirect: '/login',
  session: false,
});

exports.authRedirect = async (req,res,next)=>{
  const token = await req.user.generateJWT();
  res.cookie('token',token);
  res.redirect('http://localhost:5713/habits');
  next();
}