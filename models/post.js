const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, 
    },
    senderId: {
        type: String,
        required: true, 
    }
});

module.exports = mongoose.model('Post', postSchema);
