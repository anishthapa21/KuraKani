const mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    message: {typr: String},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    senderName: {type: String},
    receiverName: {type: String},
    userImage: {type: String, default: 'defaultPic.png'},
    IsRead: {type: Boolean, default: false},
    createdAt: {type: Date, deafault: Date.now},

});

module.experts = mongoose.model('Message', messageSchema);
