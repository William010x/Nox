const express = require('express');
const router = express.Router();

//Courses Model
const Course = require('../../models/Courses');

// @route   POST api/courses
// @desc    Create a course
// @access  Private localhost:3000 (front-end)
router.post('/', async (req, res) => {
    var id = getRandomIntInclusive(100000, 999999);
    var unique = false;
    var n = 0;
    var MAX_TRIES = 10;
    
    while (!unique && n < MAX_TRIES) {
        console.log("sesid=", id);
        await Session.findOne({ sesid: id }, function (err, result) {
            if (err) { // Internal error
                res.status(err.status).send({ success: false });
                return;
            } else if (result && result.sesid === id) { // Session exists
                id = getRandomIntInclusive(100000, 999999);
            } else {
                unique = true;
            }
        })
        n++;
    }

    console.log("New session created! sesid=", id);
    const newSession = new Session({
        courseCode: req.body.courseCode,
        pid: req.body.pid,
        sesid: id
    });

    newSession.save().then(sessions => res.json(sessions))
});

module.exports = router;