import axios from "axios"

export default axios.create({
    baseURL: "http://test.pavelkalinichenko.me/api",
    headers: {
        "Content-type": "application/json"
    }
})

//http://localhost:3000/api