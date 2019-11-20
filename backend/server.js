const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // mongoose helps us connect to the mongodb database

require("dotenv").config();

// this is our express server running on port 5000
const app = express();
const port = process.env.PORT || 5000;

// middleware - allows us to parse Json - our server will be sending and receiving Json
app.use(cors());
app.use(express.json());

// uri is the database uri - get from the mongodb dashboard
const uri = process.env.ATLAS_URI;
// this is where our database is stored.  How we start our database connection
// useNewUrlParse and useCreateIndex - new connection string parse behind the flag.  helps with updates to mongodb.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
// once the connection is open its going to log the console log information
connection.once("open", () => {
  console.log("mongodb datbase connection is established");
});

// this is what starts the server and listens
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
