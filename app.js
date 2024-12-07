const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const sequelize = require('./Models');  // Assuming sequelize is initialized here
const flash = require('connect-flash');
const Session = require('./Models/session');
const authRoutes = require('./routes/auth');  // Add auth routes for login/signup/logout
const LocalStrategy = require('passport-local').Strategy;


// Import middlewares
const isAuthenticated = require('./middlewares/auth'); // Middleware to check authentication

// Set up express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files like CSS, JS
app.use(express.static(path.join(__dirname, 'public')));
// Middleware setup
app.use(express.urlencoded({ extended: true }));



app.use(session({
  secret: 'secret', // You can use a more secure secret key
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration


passport.use(new LocalStrategy(
  { usernameField: 'email' },  // Specify that 'email' is used as the username field
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
))

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.user_id); // Adjust field to match your schema
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('success_msg');
  next();
});

// Import routes
const indexRoutes = require('./routes/auth');
const societiesRoutes = require('./routes/societies');
const competitionsRoutes = require('./routes/competitions');
const participantsRoutes = require('./routes/participants');
const teamsRoutes = require('./routes/teams');
const teamMembersRoutes = require('./routes/teamMembers');
const dashboardRoutes = require('./routes/dashboard');  // Dashboard route (protected)
const adminRoutes = require('./routes/admin');
// const adminRoutes = require('./Controllers/adminController');
const eventRouter = require('./routes/events'); // Adjust the path to where your events.js is located
const attendeeRouter = require('./routes/attendees');
const studentRouter = require('./routes/student');
const studentPartRouter = require('./routes/studentPart');
const studentAttendRouter = require('./routes/studentAttend');




// Use routes
app.use('/events', eventRouter);
app.use('/', indexRoutes);
app.use('/societies', societiesRoutes);
app.use('/competitions', competitionsRoutes);
app.use('/participants', participantsRoutes);
app.use('/teams', teamsRoutes);
app.use('/teamMembers', teamMembersRoutes);
app.use('/auth', authRoutes);  // Add auth routes for login, signup, and logout
app.use('/dashboard', dashboardRoutes);  // Protect dashboard route
app.use(authRoutes)
app.use('/admin', adminRoutes);
app.use('/attendees',attendeeRouter);
app.use('/student',studentRouter);
app.use('/studentPart',studentPartRouter);

app.use('/studentAttend',studentAttendRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
