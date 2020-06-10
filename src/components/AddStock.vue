<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-fab-transition>
                    <v-btn class="pin-top-right"
                           color="#ffdd2d"
                           dark
                           right
                           fab
                           v-on="on"
                    >
                        <v-icon size="30" color="#333">mdi-plus</v-icon>
                    </v-btn>
                </v-fab-transition>
            </template>
            <v-card>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-card-title>
                        <span class="headline">Add new stock</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field outlined :rules="nameRules" v-model="name" label="Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field outlined :rules="tickerRules" v-model="ticker" label="Ticker" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field outlined :rules="lotSizeRules" type="number" :min="1" v-model.number="lot_size" label="Lot size"
                                                  required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" :disabled="!valid" text @click="addStock">Save</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    // import {STOCK_COLLECTION, } from "../vuex/mutation-types";

    export default {
        name: "AddStock",
        data() {
            return {
                dialog: false,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 3) || `The name must be at least 3 characters.`,
                ],
                ticker: '',
                tickerRules: [
                    v => !!v || 'Ticker is required',
                    v => (v && v.length >= 2) || `The ticker must be at least 2 characters.`,
                ],
                lot_size: 1,
                lotSizeRules: [
                    v => !!v || 'Lot size is required',
                    v => (v && v >= 1) || `The lot size must be greater than 0.`,
                ],
                commonErrors: [],
                valid: true
            }
        },
        methods: {
            validate() {
                return this.$refs.form.validate()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            addStock() {
                if (!this.validate()) return
                this.resetValidation()
                this.axios
                    .post('/stock', {name: this.name, lot_size: this.lot_size, ticker: this.ticker, token: this.$store.getters.token})
                    .then(response => {
                        console.log(response)
                        this.name = ''
                        this.ticker = ''
                        // this.$store.commit(STOCK_OBJECT, {
                        //         id: response.data.id,
                        //         name: response.data.name,
                        //         ticker: response.data.ticker,
                        //         lot_size: response.data.lot_size,
                        //         created_at: response.data.created_at,
                        //         entries: response.data.entries
                        //     })
                        this.dialog = false
                        this.$router.push({name: 'stock_show', params: {id: response.data.id}});

                        // this.$store.commit(STOCK_COLLECTION, response.data)
                    })
                    .catch(err => {
                        if (!err.response) {
                            this.commonErrors = [err.message]
                            return
                        }

                        if (!err.response.data.login && !err.response.data.password) {
                            this.commonErrors = [err.message]
                            return
                        }

                        if (err.response.data.login) {
                            this.loginErrors = err.response.data.login
                        }
                        if (err.response.data.password) {
                            this.passwordErrors = err.response.data.password
                        }
                    })
            },
        },
    }
</script>

<style scoped>
    .pin-top-right {
        position: fixed;
        top: 10vh;
        right: 1em;
    }
</style>
