const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// setting up body parser to parse JSON
app.use(bodyParser.json());

// GET

app.get("/movies", (req, res) => {
  res.send("Movies");
});

/*
// Logging dynamic routes with Params
app.get("/movies/:genre/year/:year", (req, res) => {
  console.log(req.params.genre);
  console.log(req.params.year);
  res.send("Movies Route");
});

// Logging Query Strings
app.get("/movies", (req, res) => {
  console.log(req.query.sort);
  console.log(req.query.page);
  res.send("Movies");
});
*/

// POST
app.post("/movies", (req, res) => {
  let title = req.body.title;
  let year = req.body.year;
  let revenue = req.body.revenue;
  console.log(title);
  console.log(year);
  console.log(revenue);
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
