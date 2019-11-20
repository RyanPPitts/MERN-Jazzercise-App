const router = require("express").Router();
let User = require("../models/user.model");
// require the model User

// first end point that handles incoming http get requests on the /user path
// '/' root url path
//  if /users - it will get a list of all the users
router.route("/").get((req, res) => {
  User.find()
    //  mongoose method that will get a list of all the users in the database.  The find method will
    // return a promise.  Returns in Json format all the users
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  //   create a new instance of the User using newUser variable
  //  new user saved to the database
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// exporting the router
module.exports = router;
