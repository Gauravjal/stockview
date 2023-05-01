const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    biduser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    jobid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    bidprice: { 
        type: Number,
        required: true
    },
    biddescription: {
        type: String,
    },
    days: {
        type: Number,
        required: true
    },
    biddate: {
        type: Date,
        default: Date.now
    }


    
}); 
module.exports = mongoose.model('bid', bidSchema);


