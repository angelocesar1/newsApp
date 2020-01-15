const models = require("./models");

// models.Dish.findAll().then(dishes => console.log(dishes));

// models.Dish.findByPk(3).then(dish => console.log(dish));

// models.Dish.findAll({
//   where: {
//     name: "Spring Rolls"
//   }
// }).then(dishes => console.log(dishes));

models.Dish.findOne({
  where: {
    name: "Spring Rolls"
  }
}).then(dish => console.log(dish));
