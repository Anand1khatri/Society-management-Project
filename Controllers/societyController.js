const Society = require('../Models/societies');

exports.createSociety = async (req, res) => {
  try {
    const society = new Society(req.body);
    await society.save();
    res.json({ message: 'Society created successfully', society });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create society' });
  }
};

exports.getSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch societies' });
  }
};
