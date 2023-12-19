const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    message: {
        type: String
    }},
    {
        timestamps: true
    }
);

const Conversations = mongoose.model('Conversation', ConversationSchema);

module.exports = {Conversations}