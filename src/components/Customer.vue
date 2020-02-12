<template>
    <div v-if="currentCustomer" class="edit-form">
        <div v-if="error_message" class="alert alert-danger" role="alert">
            {{error_message}}
        </div>

        <h4>Customer</h4>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name"
                       v-model="currentCustomer.name"
                />
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" class="form-control" id="phone"
                       v-model.lazy="currentCustomer.phone"
                />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email"
                       v-model.lazy="currentCustomer.email"
                />
            </div>
            <div class="form-group">
                <label for="contract_number">Contract number</label>
                <input type="text" class="form-control" id="contract_number"
                       v-model="currentCustomer.contract_number"
                />
            </div>
        </form>

        <button class="badge badge-danger mr-2"
                @click="deleteCustomer"
        >
            Delete
        </button>

        <button type="submit" class="badge badge-success"
                @click="updateCustomer"
        >
            Update
        </button>
        <br/><br/>
        <div v-if="success_message" class="alert alert-success" role="alert">
            {{success_message}}
        </div>
    </div>


    <div v-else>
        <br/>
        <p>Please click on a Customer...</p>
    </div>
</template>

<script>
    import CustomerDataService from "../services/CustomerDataService"

    export default {
        name: "customer",
        data() {
            return {
                currentCustomer: null,
                error_message: '',
                success_message: ''
            }
        },
        methods: {
            getCustomer(id) {
                CustomerDataService.get(id)
                    .then(response => {
                        this.currentCustomer = response.data
                        this.currentCustomer.phone = response.data.phone.join(',')
                        this.currentCustomer.email = response.data.email.join(',')
                        console.log(response.data)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            updateCustomer() {
                this.success_message=''
                this.error_message=''
                const data = {
                    name: this.currentCustomer.name,
                    phone: this.currentCustomer.phone.replace(/\s/g,'').split(","),
                    email: this.currentCustomer.email.replace(/\s/g,'').split(","),
                    contract_number: this.currentCustomer.contract_number
                }
                CustomerDataService.update(this.currentCustomer.id, data)
                    .then(response => {
                        console.log(response.data)
                        this.success_message = 'The customer was updated successfully!'
                    })
                    .catch(e => {
                        this.error_message = e.response.data.message
                        console.log(e)
                    })
            },
            deleteCustomer() {
                CustomerDataService.delete(this.currentCustomer.id)
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({name: "customers"})
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        },
        mounted() {
            this.message = ''
            this.getCustomer(this.$route.params.id)
        }
    }
</script>

<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>