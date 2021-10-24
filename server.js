//require installed modules
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let path = require("path");
let session = require("express-session");
let flash = require("express-flash");

//create express app
const app = express();
// console.log(app);
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

//config (app.set || app.get)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./client/views"));

app.use(express.static(path.join(__dirname, "./client/static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());


require("./server/config/mongoose.js");
// where the routes used to be, we're going to require routes.js
// since routes.js exports a function, server.js will receive that function
// invoke the function we get from the require and pass it app as an argument
require("./server/config/routes.js")(app);

//server listen
app.listen(8000, () => {
  console.log("app is running on port 8000");
});
