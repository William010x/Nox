const express = require('express');
const router = express.Router();
const io = require('socket.io-client');
const constantModule = require('../../config/constants');
const delay = 30;

//Records Model
const Record = require('../../models/Records');

let socket;
if (!socket) {
    socket = io(constantModule.PublicURL + ':' + '5001');
}

// @route   GET api/records
// @desc    Get ALL records given criterias
// @access  Public
router.get('/', (req, res) => {
    Record.find()
        .sort({ timeStamp: -1 })
        .then(records => res.json(records))
});

// @route   POST api/records
// @desc    Create a record
// @access  Public
router.post('/', (req, res) => {
    // TO DO: New comment 
    if (req.body.isComment != undefined && req.body.isComment != null && req.body.isComment == "true") {
        Record.find({ studentID: req.body.studentID, sessionID: req.body.sessionID }, function (err, result) {
            var delayTime = new Date()
            delaytime = delayTime.setTime(delayTime.getTime() - 500);
            console.log(delayTime);
            if (err) { // Internal Error
                //callback(err);
                res.status(err.status).send({ success: false });
                return;
            }
            else if (result != undefined && result[result.length-1] != undefined && result[result.length-1].timeStamp > delayTime) {
                console.log(result[result.length-1].timeStamp);
                console.log(result);
                console.log("Message pass");
            }
            else {
                console.log(result);
                console.log("Message cooldown");
            }
        })
        // var recentComments = Record.find({
        //     studentID: req.body.studentID, 
        //     sessionID: req.body.sessionID}, {timeStamp: 1})
        //     .limit(1)
        //     .then(item => console.log(item.timeStamp))
        //     //timeStamp: {$gt: getDelayTime()}})

        /*
        if (result.length > 0) {
            const newRecord = new Record({
                studentID: req.body.studentID,
                sessionID: req.body.sessionID,
                value: 0,
                old_value: 0,
                comment: req.body.comment

            });
            const myParameters = { "comment": req.body.comment, "sid": req.body.studentID, sesid: req.body.sessionID, "Time": newRecord.timeStamp, "socketID": "" };

            // Websocket Cleint 
            // which sends the data to the websocket server --> in server. 
            socket.emit('newCommentToServer', myParameters);
            //console.log(5);
            console.log(myParameters);
            newRecord.save();
            res.json(myParameters);

            //newRecord.save().then(record => console.log(record) ).catch(error => console.log(error));
        }
        else {
            console.log("Message cooldown");
        }*/
    }
    // New rating
    else {
        const newRecord = new Record({
            studentID: req.body.studentID,
            sessionID: req.body.sessionID,
            value: req.body.value,
            old_value: req.body.old_value
        });
        const myParameters = { "sid": req.body.studentID, sesid: req.body.sessionID, "Time": newRecord.timeStamp, "rating": req.body.value, "socketID": "" };

        // Websocket Cleint 
        // which sends the data to the websocket server --> in server. 
        socket.emit('newCodeToServer', myParameters);
        console.log(5);
        console.log(myParameters);

        newRecord.save().then(record => res.json(record));
    }


});

// function compareTimes(timeOld, timeNew) {
//     var yearOld = parseInt(timeOld.slice(0,4));
//     var yearNew = parseInt(timeNew.slice(0,4));
//     var monthOld = parseInt(timeOld.slice(5,7));
//     var monthNew = parseInt(timeNew.slice(5,7));
//     var dayOld = parseInt(timeOld.slice(8, 10));
//     var dayNew = parseInt(timeNew.slice(8, 10));
//     var minOld = parseInt(timeOld.slice(11, 13));
//     var minNew = parseInt(timeNew.slice(11, 13));
//     var secOld = parseInt(timeOld.slice(14, 16));
//     var secNew = parseInt(timeNew.slice(14, 16));

//     return true;
// }

function getDelayTime() {
    var minDelay = 0;
    var hourDelay = 0;
    var dayDelay = 0;
    var monthDelay = 0;
    var yearDelay = 0;

    var date = new Date();

    var sec = date.getSeconds();
    var min = date.getMinutes();
    var hour = date.getHours();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    if (sec - delay >= 0) {
        sec -= delay;
    }
    else {
        sec = 60 + (sec - delay);
        minDelay = 1;
    }
    sec = (sec < 10 ? "0" : "") + sec;

    min -= minDelay;
    if (min < 0) {
        min = 59;
        hourDelay = 1;
    }
    min = (min < 10 ? "0" : "") + min;

    hour -= hourDelay;
    if (hour < 0) {
        hour = 23;
        dayDelay = 1;
    }
    hour = (hour < 10 ? "0" : "") + hour;

    day -= dayDelay;
    if (day <= 0) {
        if ([5,7,10,12].includes(month)) {
            day = 30;
        }
        else if ([1,2,4,6,8,9,11].includes(month)) {
            day = 31;
        }
        else { // March with delay becomes February
            if (year % 4 == 0) {
                day = 29;
            }
            else {
                day = 28;
            }
        }
        monthDelay = 1;
    }
    day = (day < 10 ? "0" : "") + day;

    month -= monthDelay;
    if (month <= 0) {
        month = 12;
        yearDelay = 1;
    }
    month = (month < 10 ? "0" : "") + month;

    year -= yearDelay;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

module.exports = router;
