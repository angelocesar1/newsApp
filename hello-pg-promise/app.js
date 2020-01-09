const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/nailasgarden";
const db = pgp(connectionString);

////////////////////////////////
// DELETE
db.none("DELETE FROM dishes WHERE dishid = $1", [9])
  .then(() => {
    console.log("DELETED");
  })
  .catch(error => console.log(error));

////////////////////////////////
// UPDATE
// db.none("UPDATE dishes SET price = $1, course = $2 WHERE dishid = $3", [
//   10,
//   "Entrees",
//   9
// ])
//   .then(() => {
//     console.log("UPDATED");
//   })
//   .catch(error => console.log(error));

////////////////////////////////
// RETRIEVE
// db.any("SELECT name,course,price,imageURL FROM dishes WHERE price > 5;")
//   .then(dishes => {
//     console.log(dishes);
//   })
//   .catch(error => console.log(error));

////////////////////////////////
// CREATE
// db.none("INSERT INTO dishes(name,course,price,imageURL) VALUES($1,$2,$3,$4)", [
//   "Chicken Sandwich",
//   "Entrees",
//   6.5,
//   "chickensandwich.png"
// ])
//   .then((data) => {
//     console.log("SUCCESS");
//   })
//   .catch(error => console.log(error));

// db.one(
//   "INSERT INTO dishes(name,course,price,imageURL) VALUES($1,$2,$3,$4) RETURNING dishid",
//   ["Little Burger", "Starters", 4.5, "burger.png"]
// )
//   .then(data => {
//     console.log(data.dishid);
//   })
//   .catch(error => console.log(error));
