<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="8" md="4">
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                        <tr>
                            <td>ID</td>
                            <td><small>{{stock.id}}</small></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{{ stock.name }}</td>
                        </tr>
                        <tr>
                            <td>Ticker</td>
                            <td>{{ stock.ticker }}</td>
                        </tr>
                        <tr>
                            <td>Lot size</td>
                            <td>{{ stock.lot_size }}</td>
                        </tr>
                        <tr>
                            <td>Created at</td>
                            <td>{{ (new Date(stock.created_at)).toDateString() }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    // import ValidationError from "../ValidationError";

    import {STOCK_OBJECT} from "../../vuex/mutation-types";

    export default {
        name: "SignIn",
        // components: {ValidationError},
        data() {
            return {
                stock: this.$store.state.stocks.stock,
                password: '',
                loginErrors: [],
                passwordErrors: [],
                commonErrors: []
            }
        },
        mounted() {
            this.getStock()
        },
        methods: {
            getStock() {
                this.axios
                    .post('stock/' + this.stock.id, {token: this.$store.getters.token})
                    .then(response => {
                        this.$store.commit(STOCK_OBJECT, {
                            id: response.data.id,
                            name: response.data.name,
                            ticker: response.data.ticker,
                            lot_size: response.data.lot_size,
                            created_at: response.data.created_at,
                            entries: []
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        }
    }
</script>

<style scoped>

</style>
