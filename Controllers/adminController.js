const db = require("../Model/dbs"); // Assuming a db connection setup
// const Society = require("../Model/Society");

exports.getDashboard = async (req, res) => {
    try {
        // const totalSocieties = await Society.count();
        // const totalEvents = await db.Event.count();
        // const totalParticipants = await db.Participant.count();
        // const totalTeams = await db.Team.count();

        const societies = await Society.findAll({ limit: 5 });

        res.render("adminPortal", {
            // totalSocieties,
            // totalEvents,
            // totalParticipants,
            // totalTeams,
            societies,
        });
    } catch (err) {
        res.status(500).send("Error loading dashboard");
    }
};

exports.getProfile = (req, res) => {
    res.render("profile", { user: req.session.user });
};

exports.getEditProfile = (req, res) => {
    res.render("editProfile", { user: req.session.user });
};

exports.getSocieties = async (req, res) => {
    const societies = await Society.findAll();
    res.render("societies", { societies });
};

exports.getEvents = async (req, res) => {
    const events = await db.Event.findAll();
    res.render("events", { events });
};

exports.getParticipants = async (req, res) => {
    const participants = await db.Participant.findAll();
    res.render("participants", { participants });
};

exports.getTeams = async (req, res) => {
    const teams = await db.Team.findAll();
    res.render("teams", { teams });
};

exports.editSociety = async (req, res) => {
    const society = await Society.findByPk(req.params.id);
    res.render("editSociety", { society });
};

exports.deleteSociety = async (req, res) => {
    try {
        await Society.destroy({ where: { id: req.params.id } });
        res.redirect("/home");
    } catch (err) {
        res.status(500).send("Error deleting society");
    }
};
