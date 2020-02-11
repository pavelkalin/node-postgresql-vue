const db = require("../models")
const Customers = db.customers
const Op = db.Sequelize.Op



// Find a single Customers with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Customers.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't get customer with ID = " + id
      })
    })
}
