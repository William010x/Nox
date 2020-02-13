const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

// Creates records Schema
const recordsSchema = new Schema({
    studentID: {
        type: String,
        required: true
    },
    sessionID: {
        type: String,
        required: true
    },
    dateJoined: {
        type: String,
        default: getDateTime()
    },
    value: {
        type: Number,
        default: 0, // Would this work? -- Yes, MongoDB can ignore null values in your calculations 
        minimum: 0,
        maximum: 2,
    },
    old_value: {
        type: Number,
        default: 0, // Would this work? -- Yes, MongoDB can ignore null values in your calculations 
        minimum: 0,
        maximum: 2,
    },
    timeStamp: {// Dateformat
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
    }
});

module.exports = records = mongoose.model('records', recordsSchema);

