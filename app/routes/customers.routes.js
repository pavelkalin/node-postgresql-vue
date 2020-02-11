module.exports = app => {
    const customers = require("../controllers/customers.controller.js")

    const router = require("express").Router()

    // Get customer by ID
    router.get("/:id", customers.findOne)

    app.use("/api/customers", router)
}
