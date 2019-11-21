const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  // run mongoose command
  Exercise.find()
    //   find all the exercises from database and return as JSON information or error
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

//
router.route("/add").post((req, res) => {
  // information in body
  // variables in the json object
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration); // number data type
  const date = Date.parse(req.body.date); // date data type

  //   create new Exercise using the variables above
  //  save exercise as NewExercise

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added")) // json data
    .catch(err => res.status(400).json("Error: " + err));
});

// CRUD functionality - get, create (above), delete and update

// :id is an object variable created by mongo db.  Each id is a very particular exercise object.
// get request to return the information of that exercise
// req.params.id -- get the information by id
// return information as Json or return error
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
  // once we find the exercise in the database we are going to return the data
  // as json information
  .then(exercise => res.json(exercise))
  // or we are going to return error if id is not found
  .catch(err => res.status(400).json('Error: ' + err));
});

// delete crud functionality - its going to find the id in the database and delete from database
// findbyIdandDelete will delete from database
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
  // find in the url and delete from the databse
  .then(() => res.json('Exercise deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Find the current exercise and update information
// looks for the id information and then update the json information in the database 
router.route('/update/:id').post((req, res) => {
  // first find the id in the database using the parameter
  Exercise.findById(req.params.id)
  // then update the exercise information - .then function
  .then(exercise => {
    // going to look for route and needs json object.
    // just like adding a new exercise route above but your updating the information in the
    // mongo database
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);
// now save the new exercise with the information above
    exercise.save()
    // save new information for exercise and then update
    .then(() => res.json('Exercise updated'))
    .catch(err => res.status(400).json('Error: ' + err));
})

  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;