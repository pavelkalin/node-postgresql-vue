import http from "../http-common"

class CustomerDataService {
    getAll() {
        return http.get("/customers")
    }

    findByName(name) {
        return http.get(`/customers?name=${name}`);
    }
}

export default new CustomerDataService()