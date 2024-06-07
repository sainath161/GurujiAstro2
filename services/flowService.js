const Astrologer = require("../models/astrologer");
const Users = require("../models/user");


async function distributeUserToAstrologer(userId) {
    const user = await Users.findById(userId);
    if (!user) throw new Error('User not found');

    const astrologers = await Astrologer.find();
    if (astrologers.length === 0) throw new Error('No astrologers available');

    let selectedAstrologer = null;
    if (astrologers.some(astrologer => astrologer.top)) {
        const topAstrologers = astrologers.filter(astrologer => astrologer.top);
        selectedAstrologer = topAstrologers.reduce((prev, curr) => prev.connections < curr.connections ? prev : curr);
    } else {
        selectedAstrologer = astrologers.reduce((prev, curr) => prev.connections < curr.connections ? prev : curr);
    }

    selectedAstrologer.connections += 1;
    user.connectedTo = selectedAstrologer._id;

    await selectedAstrologer.save();
    await user.save();

    return selectedAstrologer;
}

async function toggleAstrologerTopStatus(astrologerId, status) {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) throw new Error('Astrologer not found');

    astrologer.top = status;
    await astrologer.save();

    return astrologer;
}

module.exports = {
    distributeUserToAstrologer,
    toggleAstrologerTopStatus
};
