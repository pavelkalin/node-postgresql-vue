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

    findByEmail(email) {
        return http.get(`/customers?email=${email}`);
    }

    get(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http.post("/customers", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/customers/${id}`);
    }
}

export default new CustomerDataService()