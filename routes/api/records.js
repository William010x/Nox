const express = require('express');
const router = express.Router();
const io = require('socket.io-client');
const constantModule = require('../../config/constants');
const delay = 5000; // 5000 ms = 30 sec
const msgMaxLen = 200;// change msg_max_len for allowing longer msgs
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
    if (req.body.isComment != undefined && req.body.isComment != null && req.body.isComment == "true" &&
     req.body.comment.length < msgMaxLen && req.body.comment.length > 0) {
        Record.find({ studentID: req.body.studentID, sessionID: req.body.sessionID }, function (err, result) {
            var delayTime = new Date();
            delayTime = delayTime.setTime(delayTime.getTime() - delay);
            console.log(delayTime);
            if (err) { // Internal Error
                //callback(err);
                res.status(err.status).send({ success: false });
                return;
            }
            else if (result != undefined && result[result.length-1] != undefined && result[result.length-1].timeStamp > delayTime) {
                //console.log(result[result.length-1].timeStamp);
                //console.log(result);
                console.log("Message cooldown on " + req.body.comment);
            }
            else {
                //console.log(result);
                //console.log("Message pass");

                const newRecord = new Record({
                    studentID: req.body.studentID,
                    sessionID: req.body.sessionID,
                    value: 0,
                    old_value: 0,
                    comment: req.body.comment
    
                });
                const myParameters = { "comment": req.body.comment, "sid": req.body.studentID, sesid: req.body.sessionID, "Time": newRecord.timeStamp, "socketID": "" };
    
                // Websocket Client 
                // which sends the data to the websocket server --> in server. 
                socket.emit('newCommentToServer', myParameters);
                //console.log(5);
                console.log(myParameters);
                newRecord.save();
                res.json(myParameters);
    
                //newRecord.save().then(record => console.log(record) ).catch(error => console.log(error));
            }
        })
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

module.exports = router;
