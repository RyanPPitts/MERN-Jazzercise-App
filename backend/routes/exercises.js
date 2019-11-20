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
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

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
    .then(() => res.json("Exercise added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
