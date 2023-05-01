// create the mongo schema for the job
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    jobName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    proposal: [{
        type: Schema.Types.ObjectId,
        ref: 'bid'
    }],
    
    date: {
        type: Date,
        default: Date.now
    }
});
// export the job schema
module.exports = Job = mongoose.model('job', JobSchema);
