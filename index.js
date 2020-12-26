const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const { mongoURI } = require("./config/keys");
const userRoutes = require("./routes/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: "30mb" }));
app.use(bodyParser.json({ extended: false, limit: "30mb" }))
app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", userRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => console.log(`Server running on port: ${port}`));
    })
    .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);