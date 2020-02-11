const db = require("../models")
const Customers = db.customers
const Op = db.Sequelize.Op
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

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


// Create and Save a new Customers
exports.create = (req, res) => {
    // First simple validation
    if (!req.body.name) {
        res.status(400).send({
            message: "Name shouldn't be empty"
        })
        return
    }

    if (!req.body.email) {
        res.status(400).send({
            message: "Email shouldn't be empty"
        })
        return
    }

    if (!req.body.phone) {
        res.status(400).send({
            message: "Phone shouldn't be empty"
        })
        return
    }


    // Validate for e164 format
    try {
        if (!phoneUtil.isValidNumber(phoneUtil.parse(req.body.phone))) {
            res.status(400).send({
                message: "Phone should be in e164 format"
            })
            return
        }
    } catch (e) {
        res.status(400).send({
            message: "Phone should be in e164 format"
        })
        return
    }


    if (!req.body.contract_number) {
        res.status(400).send({
            message: "Contract number shouldn't be empty"
        })
        return
    }

// Create a Customers
    const customers = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        contract_number: req.body.contract_number,
    }

// Save Customers in the database
    Customers.create(customers)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creation of customer"
            })
        })
}

// Update a customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id

    //quick validation in update method also
    if ('name' in req.body) {
        if (!req.body.name) {
            res.status(400).send({
                message: "Name shouldn't be empty"
            })
            return
        }
    }

    if ('phone' in req.body) {
        if (!req.body.phone) {
            res.status(400).send({
                message: "Phone shouldn't be empty"
            })
            return
        }


        // Validate for e164 format
        try {
            if (!phoneUtil.isValidNumber(phoneUtil.parse(req.body.phone))) {
                res.status(400).send({
                    message: "Phone should be in e164 format"
                })
                return
            }
        } catch (e) {
            res.status(400).send({
                message: "Phone should be in e164 format"
            })
            return
        }
    }


    Customers.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({
                    message: "Customers was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update customer with id=${id}. Maybe Customers was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customers with id=" + id
            })
        })
}