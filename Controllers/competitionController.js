const Competition = require('../Models/Competition');

exports.createCompetition = async (req, res) => {
  try {
    const competition = new Competition(req.body);
    await competition.save();
    res.json({ message: 'Competition created successfully', competition });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create competition' });
  }
};

exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
};
