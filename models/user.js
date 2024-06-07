const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    connectedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer' },
});

const Users = mongoose.model('User', UserSchema);

module.exports = Users;
