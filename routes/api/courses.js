const express = require('express');
const router = express.Router();

//Courses Model
const Course = require('../../models/Courses');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

router.get('/FindCourse', (req, res) => {
    Course.find({ pid: req.query.pid }).distinct('courseCode', req.query.sesid, function (err, result) { //see the use of distinct
        if (err) { // Internal Error
            //callback(err);
            res.status(err.status).send({ success: false });
            return;
        }
        else {
            console.log('THIS IS IT');
            res.json(result);
        }
    });
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private localhost:3000 (front-end)
router.post('/', async (req, res) => {
    var id = getRandomIntInclusive(100000, 999999);
    var unique = false;
    var n = 0;
    var MAX_TRIES = 10;
    
    while (!unique && n < MAX_TRIES) {
        console.log("courseid=", id);
        await Course.findOne({ courseid: id }, function (err, result) {
            if (err) { // Internal error
                res.status(err.status).send({ success: false });
                return;
            } else if (result && result.sesid === id) { // Course exists
                id = getRandomIntInclusive(100000, 999999);
            } else {
                unique = true;
            }
        })
        n++;
    }

    console.log("New course created! courseid=", id);
    const newCourse = new Course({
        courseCode: req.body.courseCode,
        pid: req.body.pid,
        courseid: id
    });

    newCourse.save().then(course => res.json(course))
});

module.exports = router;