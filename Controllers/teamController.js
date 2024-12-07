const Team = require('../Models/Team');

exports.createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.json({ message: 'Team created successfully', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};
