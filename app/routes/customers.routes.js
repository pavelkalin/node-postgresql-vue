module.exports = app => {
    const customers = require("../controllers/customers.controller.js")

    const router = require("express").Router()

    // Get customer by ID
    router.get("/:id", customers.findOne)

    // Create a new Customer
    router.post("/", customers.create)

    app.use("/api/customers", router)
}
