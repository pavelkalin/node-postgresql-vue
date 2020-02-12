const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const whitelist = ['http://localhost:8080', 'http://test.pavelkalinichenko.me', 'http://localhost:3000', 'http://localhost']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

const db = require("./app/models")
db.sequelize.sync()
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.")
// })

// simple route
app.get("/", (req, res) => {
    res.json({message: "Hey Hey Hey."})
})

require("./app/routes/customers.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})