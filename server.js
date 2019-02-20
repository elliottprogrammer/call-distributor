const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const reaches = require('./routes/api/reaches');

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true})
    .then(() => console.log("MongoDb Connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Pasport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/reaches', reaches);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
