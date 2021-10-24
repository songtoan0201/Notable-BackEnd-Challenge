let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/mongoDB", { useNewUrlParser: true });

require("../models/Doctor");
require("../models/Patient");
