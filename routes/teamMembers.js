const express = require('express');
const router = express.Router();
const Members = require('../Models/teamMember'); // Import the Members model
const pool = require('../Models/db');
const sequelize = require('../db'); // Import sequelize instance

// Helper function to validate enums
const validateEnum = (value, validValues) => validValues.includes(value);

// Updated valid positions and departments
const validPositions = [
  'President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'General Secretary',
  'Event Manager',
  'Head',
  'Co-Head',
  'Members',
];

const validDepartments = [
  'Event Administration',
  'Marketing',
  'Media And Promotions',
  'Guest Relations',
  'Security',
  'SOP',
  'In House Media',
  'Excom',
];

// Get all team members
router.get('/', async (req, res) => {
  try {
    const teamMembers = await sequelize.query('SELECT * FROM team_member', { type: sequelize.QueryTypes.SELECT });
    res.render('teamMembers', { title: 'Team Members', teamMembers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting team members');
  }
});

// Display the Add Member form
router.get('/add', (req, res) => {
  res.render('addMember', {
    adminEmail: req.session.user ? req.session.user.email : '',
    title: 'Add Member',
    member_id: '',
    roll_no: '',
    name: '',
    phone: '',
    society_id: '',
    position: '',
    department: '',
    selectedPosition: '', // Default position for the dropdown
    selectedDepartment: '',
    errors: null,
    validPositions,
    validDepartments,
  });
});

// Add a new team member
// Add a new team member
router.post('/add', async (req, res) => {
  const { member_id, roll_no, name, phone, society_id, position, department } = req.body;

  const errors = {};

  // Validate fields
  if (!member_id || !roll_no || !name || !phone || !society_id || !position || !department) {
    errors.missingFields = 'All fields are required';
  }
  if (!validateEnum(position, validPositions)) {
    errors.position = `Invalid position. Valid values are: ${validPositions.join(', ')}`;
  }
  if (!validateEnum(department, validDepartments)) {
    errors.department = `Invalid department. Valid values are: ${validDepartments.join(', ')}`;
  }

  if (await Members.findOne({ where: { member_id } })) {
    errors.member_id = 'Member ID already exists';
  }

  // Allow duplicate positions for "Excom" only if `society_id` differs
  if (department === 'Excom') {
    const [existingPosition] = await sequelize.query(
      'SELECT * FROM team_member WHERE department = ? AND position = ? AND society_id = ?',
      { replacements: ['Excom', position, society_id], type: sequelize.QueryTypes.SELECT }
    );
    if (existingPosition) {
      errors.duplicatePosition = `Position "${position}" in department "Excom" is already taken for this society.`;
    }
  }

  const [society] = await sequelize.query('SELECT * FROM society WHERE society_id = ?', {
    replacements: [society_id],
    type: sequelize.QueryTypes.SELECT,
  });
  if (!society) {
    errors.society_id = 'Society ID does not exist';
  }

  // If there are errors, re-render the form
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('addMember', {
      title: 'Add Team Member',
      errors,
      member_id,
      roll_no,
      name,
      phone,
      society_id,
      position,
      department,
      adminEmail: req.session.user ? req.session.user.email : '',
      validPositions,
      validDepartments,
      selectedPosition: position || '',
      selectedDepartment: department || '',
    });
  }

  try {
    await sequelize.query(
      'INSERT INTO team_member (member_id, roll_no, name, phone, society_id, position, department) VALUES (?, ?, ?, ?, ?, ?, ?)',
      { replacements: [member_id, roll_no, name, phone, society_id, position, department] }
    );
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding team member');
  }
});

// Edit a team member
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    const [teamMember] = await sequelize.query('SELECT * FROM team_member WHERE member_id = ?', {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });
    if (!teamMember) {
      return res.status(404).send('Team member not found');
    }
    res.render('editMember', {
      adminEmail: req.session.user ? req.session.user.email : '',
      title: 'Edit Team Member',
      member: teamMember,  // Pass the teamMember object here
      validPositions,
      validDepartments,
      selectedPosition: teamMember.position,  // Set the current position
      selectedDepartment: teamMember.department,  // Set the current department
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching team member');
  }
});


router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { roll_no, name, phone, society_id, position, department } = req.body;

  const errors = {};

  // Validate fields
  if (!roll_no || !name || !phone || !society_id || !position || !department) {
    errors.missingFields = 'All fields are required';
  }
  if (!validateEnum(position, validPositions)) {
    errors.position = `Invalid position. Valid values are: ${validPositions.join(', ')}`;
  }
  if (!validateEnum(department, validDepartments)) {
    errors.department = `Invalid department. Valid values are: ${validDepartments.join(', ')}`;
  }

  const [society] = await sequelize.query('SELECT * FROM society WHERE society_id = ?', {
    replacements: [society_id],
    type: sequelize.QueryTypes.SELECT,
  });
  if (!society) {
    errors.society_id = 'Society ID does not exist';
  }

  // Allow duplicate positions for "Excom" only if `society_id` differs
  if (department === 'Excom') {
    const [existingPosition] = await sequelize.query(
      'SELECT * FROM team_member WHERE department = ? AND position = ? AND society_id = ? AND member_id != ?',
      { replacements: ['Excom', position, society_id, id], type: sequelize.QueryTypes.SELECT }
    );
    if (existingPosition) {
      errors.duplicatePosition = `Position "${position}" in department "Excom" is already taken for this society.`;
    }
  }

  // If there are errors, re-render the form with current data
  if (Object.keys(errors).length > 0) {
    const [teamMember] = await sequelize.query('SELECT * FROM team_member WHERE member_id = ?', {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });
    return res.status(400).render('editMember', {
      title: 'Edit Team Member',
      errors,
      member: teamMember,
      validPositions,
      validDepartments,
      selectedPosition: position || teamMember.position,
      selectedDepartment: department || teamMember.department,
      adminEmail: req.session.user ? req.session.user.email : '',
    });
  }

  try {
    await sequelize.query(
      'UPDATE team_member SET roll_no = ?, name = ?, phone = ?, society_id = ?, position = ?, department = ? WHERE member_id = ?',
      { replacements: [roll_no, name, phone, society_id, position, department, id] }
    );
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating team member');
  }
});

module.exports = router;
