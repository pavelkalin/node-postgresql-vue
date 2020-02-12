import http from "../http-common"

class CustomerDataService {
    getAll() {
        return http.get("/customers")
    }

    findByName(name) {
        return http.get(`/customers?name=${name}`);
    }

    findByPhone(phone) {
        return http.get(`/customers?phone=${phone}`);
    }
}

export default new CustomerDataService()