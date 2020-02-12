import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/customers",
            name: "customers",
            component: () => import("./components/Customers")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddCustomer")
        },
        {
            path: "/customers/:id",
            name: "customer-details",
            component: () => import("./components/Customer")
        },
    ]
})