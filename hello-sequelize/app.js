const models = require("./models");

/////////////////////////////////////
// Adding Items to Database

// let dish = models.Dish.build({
//   name: "Cake",
//   description: "This cake is delicious!",
//   price: 10.5
// });

// dish.save().then(persistedDish => {
//   console.log(persistedDish);
// });

/////////////////////////////////////
// Deleting Items in Database

// models.Dish.destroy({
//   where: {
//     id: 3
//   }
// }).then(result => console.log(result));

/////////////////////////////////////
// Updating Items in Database

// models.Dish.update(
//   {
//     name: "Carrot Cake",
//     price: 8.0
//   },
//   {
//     where: {
//       id: 2
//     }
//   }
// ).then(updatedDish => console.log(updatedDish));

/////////////////////////////////////
// Logging Items from database into the terminal

// models.Dish.findAll().then(dishes => console.log(dishes));

// models.Dish.findByPk(3).then(dish => console.log(dish));

// models.Dish.findAll({
//   where: {
//     name: "Spring Rolls"
//   }
// }).then(dishes => console.log(dishes));

// models.Dish.findOne({
//   where: {
//     name: "Spring Rolls"
//   }
// }).then(dish => console.log(dish));
