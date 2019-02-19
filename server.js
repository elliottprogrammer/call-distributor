const express = require("express");
const mongoose = require("mongoose");

const auth = require('./routes/api/auth');
const reaches = require('./routes/api/reaches');

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true})
    .then(() => console.log("MongoDb Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello from server.js(/)"));

// Use Routes
app.use('/api/users', auth);
app.use('/api/reaches', reaches);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
