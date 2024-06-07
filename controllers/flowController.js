const Astrologer = require('../models/astrologer');
const Users = require('../models/user');
const { distributeUserToAstrologer, toggleAstrologerTopStatus } = require('../services/flowService');

async function connectUser(req, res) {
    try {
        const userId = req.body.userId;
        const astrologer = await distributeUserToAstrologer(userId);
        res.status(200).json(astrologer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function setTopAstrologer(req, res) {
    try {
        const { astrologerId, status } = req.body;
        const astrologer = await toggleAstrologerTopStatus(astrologerId, status);
        res.status(200).json(astrologer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function createUser(req, res) {
    try {
        const user = new Users(req.body);
        await user.save();
        res.status(201).json({ userId: user._id, message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function createAstrologer(req, res) {
    try {
        const astrologer = new Astrologer(req.body);  // req.body should contain { name: "Astrologer 1" }
        await astrologer.save();
        res.status(201).json({ astrologerId: astrologer._id, message: 'Astrologer created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    connectUser,
    setTopAstrologer,
    createUser,
    createAstrologer
};
