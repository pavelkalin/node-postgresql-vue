<template>
    <div class="submit-form">
        <div v-if="!submitted">

            <div v-if="error_message" class="alert alert-danger" role="alert">
                {{error_message}}
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input
                        type="text"
                        class="form-control"
                        id="name"
                        required
                        v-model="customer.name"
                        name="name"
                        aria-describedby="nameHelpBlock"
                />
                <small id="nameHelpBlock" class="form-text text-muted">
                    Name can't be empty
                </small>
            </div>

            <div class="form-group">
                <label for="phone">Phone</label>
                <input
                        class="form-control"
                        id="phone"
                        required
                        v-model="customer.phone"
                        name="phone"
                        aria-describedby="phoneHelpBlock"
                        placeholder="+972538632010"
                />
                <small id="phoneHelpBlock" class="form-text text-muted">
                    Phone should be in e164 format. For example <br/><b>+972538632010</b><br/>
                    For adding several phones use comma like this <br/><b>+972538632010,+972538632011</b><br/>
                </small>
            </div>

            <div class="form-group">
                <label for="name">Email</label>
                <input
                        type="text"
                        class="form-control"
                        id="email"
                        required
                        v-model="customer.email"
                        name="email"
                        aria-describedby="emailHelpBlock"
                />
                <small id="emailHelpBlock" class="form-text text-muted">
                    Email should be in valid format. For example <br/><b>pavel@mail.ru</b><br/>
                    For adding several phones use comma like this <br/><b>pavel@mail.ru,pavel@gmail.com</b><br/>
                </small>
            </div>

            <div class="form-group">
                <label for="name">Contract number</label>
                <input
                        type="text"
                        class="form-control"
                        id="contract_number"
                        required
                        v-model="customer.contract_number"
                        name="contract_number"
                />
            </div>


            <button @click="saveCustomer" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You created a new Customer successfully!</h4>
            <button class="btn btn-success" @click="newCustomer">Add</button>
        </div>
    </div>
</template>

<script>
    import CustomerDataService from "../services/CustomerDataService"

    export default {
        name: "add-customer",
        data() {
            return {
                customer: {
                    id: null,
                    name: "",
                    phone: "",
                    email: "",
                    contract_number: ""
                },
                submitted: false,
                error_message: ""
            }
        },
        methods: {
            saveCustomer() {
                const data = {
                    name: this.customer.name,
                    phone: this.customer.phone ? this.customer.phone.replace(/\s/g,'').split(",") : [''],
                    email: this.customer.email ? this.customer.email.replace(/\s/g,'').split(",") : [''],
                    contract_number: this.customer.contract_number
                }
                CustomerDataService.create(data)
                    .then(response => {
                        this.customer.id = response.data.id
                        console.log(response.data)
                        this.submitted = true
                    })
                    .catch(e => {
                        this.error_message = e.response.data.message
                    })

            },

            newCustomer() {
                this.submitted = false
                this.error_message = ''
                this.customer = {}
            }
        }
    }
</script>

<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>