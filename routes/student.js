const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const Society = require('../Models/societies');
const Event = require('../Models/events');
// const Competition = require('../Models/competition');
const Competition = require('../Models/Competition');
const Participant = require('../Models/participants');
const attendees = require('../Models/attendees');
const Members = require('../Models/teamMember');
const { Op } = require('sequelize');
// Middleware to ensure the user is an admin
function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'student') {
    return next();
  }
  res.status(403).send('Access denied. Admins only!');
}

// Admin Dashboard
router.get('/', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('studentPortal', { adminEmail: req.session.user.email });
});

// Society Routes
router.get('/society', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Fetch societies and map them for easier rendering
    const societies = await Society.findAll();
    const societyData = societies.map(society => ({
      id: society.dataValues.society_id,
      name: society.dataValues.society_name,
      description: society.dataValues.society_description,
    }));
    res.render('studentSocieties', { title: 'Societies', data: societyData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching societies.');
  }
});



// Edit Society


// Delete Society

router.post('/societies', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { name, description } = req.body; // Ensure these match the form field names
    if (!name || !description) {
      return res.status(400).send('Name and description are required.');
    }
    await Society.create({ society_name: name, society_description: description });
    res.redirect('/admin/society'); // Redirect back to the societies page
  } catch (err) {
    console.error('Error adding society:', err);
    res.status(500).send('Error adding society.');
  }
});



// Fetch Events scheduled after today's date
router.get('/Event', async (req, res) => {
    try {
      const today = new Date(); // Get today's date
      const events = await Event.findAll({
        where: {
          event_date: {
            [Op.gt]: today, // Filter events with dates greater than today
          },
        },
      });
      res.render('studentEvents', { data: events });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Fetch Competitions scheduled after today's date
  router.get('/competitions', ensureAuthenticated, ensureAdmin, async (req, res) => {
    try {
      const today = new Date(); // Get today's date
      const competitions = await Competition.findAll({
        where: {
          competition_date: {
            [Op.gt]: today, // Filter competitions with dates greater than today
          },
        },
      });
      res.render('studentComp', { title: 'Competitions', data: competitions, error: null });
    } catch (err) {
      console.error('Error fetching competitions:', err);
      res.status(500).send('Error fetching competitions.');
    }
  });

// Add a new competition


// Edit a competition


// Delete a competition



// List all participants
router.get('/participants', async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.render('studentParticipant', { title: 'List of Participants', data: participants,adminEmail: req.session.user.emai });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching participants');
  }
});
// router.get('/participants', async (req, res) => {
//   try {
//     const events = await Event.findAll();
//     res.render('adminEvent', { data: events });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Delete participant



//attendees

router.get('/attendees', async (req, res) => {
  try {
    const attendee = await attendees.findAll();
    res.render('studentAttendee', { data: attendee });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



//Members
router.get('/members', async (req, res) => {
  try {
    const Member = await Members.findAll();
    res.render('studentMember', { data: Member });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});




router.get('/logout', ensureAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/dashboard');
  });
});

// Repeat similar structure for Competitions and Participants...

module.exports = router;
