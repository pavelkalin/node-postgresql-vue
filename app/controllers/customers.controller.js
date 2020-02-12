const db = require("../models")
const Customers = db.customers
const Op = db.Sequelize.Op
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const email_validator = require("email-validator")

// find a single customer with an id
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

// create and save a new customer
exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "Name shouldn't be empty"
        })
        return
    }

    if (!Array.isArray(req.body.email)) {
        res.status(400).send({
            message: "Email should be a list"
        })
        return
    }

    if (!Array.isArray(req.body.phone)) {
        res.status(400).send({
            message: "Phone should be a list"
        })
        return
    }

    for (let email of req.body.email) {

        if (!email) {
            res.status(400).send({
                message: "Email shouldn't be empty"
            })
            return
        }


        if (!email_validator.validate(email)) {
            res.status(400).send({
                message: "Email should be correct"
            })
            return
        }
    }
    for (let phone of req.body.phone) {

        if (!phone) {
            res.status(400).send({
                message: "Phone shouldn't be empty"
            })
            return
        }

        // Validate for e164 format
        try {
            if (!phoneUtil.isValidNumber(phoneUtil.parse(phone))) {
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
    if (!req.body.contract_number) {
        res.status(400).send({
            message: "Contract number shouldn't be empty"
        })
        return
    }

    const customers = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        contract_number: req.body.contract_number,
    }

    // send data to DB
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

// Update a customer by the id
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

    if ('contract_number' in req.body) {
        if (!req.body.contract_number) {
            res.status(400).send({
                message: "Contract number shouldn't be empty"
            })
            return
        }
    }

    if ('phone' in req.body) {
        if (!Array.isArray(req.body.phone)) {
            res.status(400).send({
                message: "Phone should be a list"
            })
            return
        }
        for (let phone of req.body.phone) {

            if (!phone) {
                res.status(400).send({
                    message: "Phone shouldn't be empty"
                })
                return
            }

            // Validate for e164 format
            try {
                if (!phoneUtil.isValidNumber(phoneUtil.parse(phone))) {
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
    }

    if ('email' in req.body) {
        if (!Array.isArray(req.body.email)) {
            res.status(400).send({
                message: "Email should be a list"
            })
            return
        }
        for (let email of req.body.email) {

            if (!email) {
                res.status(400).send({
                    message: "Email shouldn't be empty"
                })
                return
            }


            if (!email_validator.validate(email)) {
                res.status(400).send({
                    message: "Email should be correct"
                })
                return
            }
        }
    }

    // send data to DB
    Customers.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            // Here response num is a list
            if (num[0] === 1) {
                res.send({
                    message: "Customer was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            })
        })
}

// delete customer by id
exports.delete = (req, res) => {
    const id = req.params.id

    // send data to DB
    Customers.destroy({
        where: {id: id}
    })
        .then(num => {
            // Here response num is just number
            if (num === 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete customer with id=${id}. Maybe customer was not found?`, num: num
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete customer with id=" + id
            })
        })
}

// Retrieve all customers
exports.findAll = (req, res) => {
    const name = req.query.name
    const phone = req.query.phone ? `+${req.query.phone.replace(/\s/g,'')}` : null
    const email = req.query.email
    let condition = null


    console.log(phone);
    // condition = {email: { [Op.contains]: [`${email}`] }}
    //condition = {[Op.and]: [{name: {[Op.iLike]: `%${name}%`}}, {email: {[Op.iLike]: `%${email}%`}}]}

    if (('name' in req.query) && ('email' in req.query) && ('phone' in req.query)) {
        condition = {[Op.and]: [{name: {[Op.iLike]: `%${name}%`}}, {email: {[Op.contains]: [`${email}`]}}, {phone: {[Op.contains]: [`${phone}`]}}]}
    } else if (('name' in req.query) && ('email' in req.query)) {
        condition = {[Op.and]: [{name: {[Op.iLike]: `%${name}%`}}, {email: {[Op.contains]: [`${email}`]}}]}
    } else if (('name' in req.query) && ('phone' in req.query)) {
        condition = {[Op.and]: [{name: {[Op.iLike]: `%${name}%`}}, {phone: {[Op.contains]: [`${phone}`]}}]}
    } else if (('email' in req.query) && ('phone' in req.query)) {
        condition = {[Op.and]: [{email: {[Op.contains]: [`${email}`]}}, {phone: {[Op.contains]: [`${phone}`]}}]}
    } else if ('name' in req.query) {
        condition = {name: {[Op.iLike]: `%${name}%`}}
    } else if ('phone' in req.query) {
        condition = {phone: {[Op.contains]: [`${phone}`]}}
    } else if ('email' in req.query) {
        condition = {email: {[Op.contains]: [`${email}`]}}
    }

    const validator = require("email-validator")

    // send data to DB
    Customers.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            })
        })
}