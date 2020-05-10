<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-fab-transition>
                    <v-btn style="bottom: 15px;"
                           color="green"
                           dark
                           absolute
                           bottom
                           right
                           fab
                           v-on="on"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-fab-transition>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Add new stock</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="name" label="Name" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="ticker" label="Ticker" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field type="number" :min="1" v-model.number="lot_size" label="Lot size" required></v-text-field >
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" :disabled="!name || !ticker || !lot_size" text @click="addStock">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {STOCK_OBJECT} from "../vuex/mutation-types";

    export default {
        name: "AddStock",
        data: () => ({
            dialog: false,
            name: '',
            ticker: '',
            lot_size: 1,
        }),
        methods: {
            addStock() {
                this.axios
                    .post('/stock', {name: this.name, lot_size: this.lot_size, ticker: this.ticker, token: this.$store.getters.token})
                    .then(response => {
                        this.name = ''
                        this.ticker = ''
                        this.$store.commit(STOCK_OBJECT, {name: response.data.name, ticker: response.data.ticker, positions: []})
                        this.dialog = false
                    })
                    .catch(err => {
                        if (err.response.data.login) {
                            this.loginErrors = err.response.data.login
                        }
                        if (err.response.data.password) {
                            this.passwordErrors = err.response.data.password
                        }

                        if (!err.response.data.login && !err.response.data.password) {
                            this.commonErrors = [err.message]
                        }
                    })
            }
        },

    }
</script>

<style scoped>

</style>
