const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //   single field - username
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // trim white space
      minlength: 3 // at least three characters long
    }
  },
  {
    timestamps: true // create field for when created and modified
  }
);

const User = mongoose.model("User", userSchema);

// export with module.exports
module.exports = User;
