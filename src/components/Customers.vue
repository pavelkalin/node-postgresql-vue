<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by name"
                       v-model="name"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchName"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by phone"
                       v-model="phone"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchPhone"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by email"
                       v-model="email"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchEmail"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Customers List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(customer, index) in customers"
                    :key="index"
                    @click="setActiveCustomer(customer, index)"
                >
                    {{ customer.name }}
                </li>
            </ul>

            <!--            <button class="m-3 btn btn-sm btn-danger" @click="removeAllCustomers">-->
            <!--                Remove All-->
            <!--            </button>-->
        </div>
        <div class="col-md-6">
            <div v-if="currentCustomer">
                <h4>Customer</h4>
                <div>
                    <label><strong>Name:</strong></label>
                    {{ currentCustomer.name }}
                </div>
                <div>
                    <label><strong>Phone:</strong></label>
                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="(phone, index) in currentCustomer.phone"
                            :key="index"
                        >{{phone}}
                        </li>

                    </ul>
                </div>
                <div>
                    <label><strong>Email:</strong></label>
                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="(email, index) in currentCustomer.email"
                            :key="index"
                        >{{email}}
                        </li>

                    </ul>
                </div>
                <div>
                    <label><strong>Contract number:</strong></label> {{ currentCustomer.contract_number }}
                </div>
                <a class="badge badge-warning"
                   :href="'/customers/' + currentCustomer.id"
                >
                    Edit
                </a>
            </div>
            <div v-else>
                <br/>
                <p>Please click on a Customer...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomerDataService from "../services/CustomerDataService";

    export default {
        name: "customers-list",
        data() {
            return {
                customers: [],
                currentCustomer: null,
                currentIndex: -1,
                name: "",
                phone: "",
                email: ""
            };
        },
        methods: {
            retrieveCustomers() {
                CustomerDataService.getAll()
                    .then(response => {
                        this.customers = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveCustomers();
                this.currentCustomer = null;
                this.currentIndex = -1;
            },
            setActiveCustomer(customer, index) {
                this.currentCustomer = customer;
                this.currentIndex = index;
            },
            removeAllCustomers() {
                CustomerDataService.deleteAll()
                    .then(response => {
                        console.log(response.data);
                        this.refreshList();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            searchName() {
                this.phone=''
                this.email=''
                CustomerDataService.findByName(this.name)
                    .then(response => {
                        this.customers = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            searchPhone() {
                this.name=''
                this.email=''
                CustomerDataService.findByPhone(this.phone)
                    .then(response => {
                        this.customers = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            searchEmail() {
                this.name=''
                this.phone=''
                CustomerDataService.findByEmail(this.email)
                    .then(response => {
                        this.customers = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.retrieveCustomers();
        }
    };
</script>

<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>