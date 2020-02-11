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

//
// // Retrieve all Customerss from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title
//   const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null
//
//   Customers.findAll({ where: condition })
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving customers."
//       })
//     })
// }
//
//
// // Create and Save a new Customers
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     })
//     return
//   }
//
//   // Create a Customers
//   const customers = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
//   }
//
//   // Save Customers in the database
//   Customers.create(customers)
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Customers."
//       })
//     })
// }
//
// // Find a single Customers with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id
//
//   Customers.findByPk(id)
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Customers with id=" + id
//       })
//     })
// }
//
// // Update a Customers by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id
//
//   Customers.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num === 1) {
//         res.send({
//           message: "Customers was updated successfully."
//         })
//       } else {
//         res.send({
//           message: `Cannot update Customers with id=${id}. Maybe Customers was not found or req.body is empty!`
//         })
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Customers with id=" + id
//       })
//     })
// }
//
// // Delete a Customers with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id
//
//   Customers.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num === 1) {
//         res.send({
//           message: "Customers was deleted successfully!"
//         })
//       } else {
//         res.send({
//           message: `Cannot delete Customers with id=${id}. Maybe Customers was not found!`
//         })
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Customers with id=" + id
//       })
//     })
// }
//
// // Delete all Customerss from the database.
// exports.deleteAll = (req, res) => {
//   Customers.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Customerss were deleted successfully!` })
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all customers."
//       })
//     })
// }
//
// // find all published Customers
// exports.findAllPublished = (req, res) => {
//   Customers.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving customers."
//       })
//     })
// }
