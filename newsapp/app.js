const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const path = require("path");
const session = require("express-session");
const userRoutes = require("./routes/users");
const indexRoutes = require("./routes/index");
const CONNECTION_STRING = "postgres://localhost:5432/newsdb";
const SALT_ROUNDS = 10;

const VIEWS_PATH = path.join(__dirname, "/views");

// configuring view engine
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");
app.use("/css", express.static("css"));

app.use(
  session({
    secret: "lhadljdfbj",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

db = pgp(CONNECTION_STRING);

// setup routes
app.use("/users", userRoutes);
app.use("/", indexRoutes);

app.listen(3000, () => {
  console.log("Server is running...");
});
