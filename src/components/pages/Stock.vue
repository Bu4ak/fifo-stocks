<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="8" md="4">
                <v-simple-table dense>
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
                    <hr>
                    <tr>
                        <td><h3 class="text-no-wrap">Total count</h3></td>
                        <td><h3 class="text-no-wrap">{{ totalCount - sellCount * stock.lot_size}}</h3></td>
                    </tr>
                    <tr>
                        <td><h3 class="text-no-wrap">Total amount</h3></td>
                        <td><h3>{{ totalAmount - (sellAmount * this.stock.lot_size) }}</h3></td>
                    </tr>
                    <tr>
                        <td><h3 class="text-no-wrap">Avg amount</h3></td>
                        <td><h3>{{ isNaN(avgAmount) ? ~~avgAmount : avgAmount }}</h3></td>
                    </tr>
                    </tbody>
                </v-simple-table>
                <v-row>
                    <v-col class="pa-1" cols="12" sm="12" md="12">
                        <v-card>
                            <v-card-text>
                                <div>Buy</div>
                                <v-text-field v-model="amount" type="number" :min="0.001" step="0.001" label="Price" required></v-text-field>
                                <v-col class="pa-0" cols="6" sm="6" md="6">
                                    <v-text-field v-model="buyCount" type="number" :min="1" step="1" label="Count" required></v-text-field>
                                </v-col>
                                <v-btn rounded style="bottom: 15px" :disabled="!amount || !buyCount" absolute right color="green" @click="addEntry">
                                    <v-icon color="white">fa-plus</v-icon>
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col class="pa-1" cols="12" sm="12" md="12">
                        <v-card>
                            <v-card-text>
                                <div>Sell</div>
                                <v-col class="pa-0" cols="6" sm="6" md="6">
                                    <v-text-field v-model="sellCount" type="number" :min="0" step="1" :max="totalCount / stock.lot_size" label="Count" required></v-text-field>
                                </v-col>
                                <v-btn rounded style="bottom: 15px" :disabled="!sellCount" absolute right color="red" @click="removeEntry">
                                    <v-icon color="white">fa-minus</v-icon>
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
<!--                    <v-checkbox v-model="group" :label="'Group'"></v-checkbox>-->
                    <entry :stock="stock" @stocks-for-sale="updateTotalCount" :entries="stock.entries" :group="group" :sellCount="sellCount"></entry>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {STOCK_OBJECT} from "../../vuex/mutation-types";
    import Entry from "../stock/Entry";

    export default {
        name: "SignIn",
        components: {Entry},
        data() {
            return {
                group: false,
                sellCount: '',
                sellAmount: 0,
                buyCount: '',
                amount: '',
                password: '',
                loginErrors: [],
                passwordErrors: [],
                commonErrors: []
            }
        },
        computed: {
            stock() {
                return this.$store.state.stocks.stock
            },
            totalCount() {
                let totalCount = 0
                for (const item in this.stock.entries) {
                    totalCount += Number(this.stock.entries[item].count) * this.stock.lot_size
                }
                return totalCount
            },
            totalAmount() {
                let totalAmount = 0.0
                for (const item in this.stock.entries) {
                    totalAmount += Number(this.stock.entries[item].amount) * Number(this.stock.lot_size) * Number(this.stock.entries[item].count)
                }
                return totalAmount
            },
            avgAmount() {
                return (this.totalAmount / this.totalCount

                    // (this.totalAmount - this.sellAmount * this.stock.lot_size)
                    // /
                    // ((this.totalCount - this.sellCount) * this.stock.lot_size)

                ).toFixed(2)
            }
        },
        mounted() {
            this.getStock()
        },
        methods: {
            updateTotalCount(e) {
                this.sellAmount = e
            },
            getStock() {
                this.axios
                    .post('stock-data/' + this.$route.params.id, {token: this.$store.getters.token})
                    .then(response => {
                        this.$store.commit(STOCK_OBJECT, {
                            id: response.data.id,
                            name: response.data.name,
                            ticker: response.data.ticker,
                            lot_size: response.data.lot_size,
                            created_at: response.data.created_at,
                            entries: response.data.entries
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            addEntry() {
                const count = this.buyCount
                const amount = this.amount
                this.amount = ''
                this.buyCount = ''
                this.axios
                    .post('entry', {
                        token: this.$store.getters.token,
                        amount: amount,
                        count: count,
                        stock_id: this.stock.id
                    })
                    .then(response => {
                        let entries = {...this.stock.entries}
                        entries[response.data.id] = {
                            id: response.data.id,
                            count: response.data.count,
                            amount: response.data.amount,
                            stock_id: response.data.stock_id,
                            created_at: response.data.created_at,
                            updated_at: response.data.updated_at,
                        }

                        this.$store.commit(STOCK_OBJECT, {
                            ...this.stock, entries: entries
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            removeEntry() {
                const count = this.sellCount
                this.sellCount = ''
                this.axios
                    .post('entry-sell', {
                        token: this.$store.getters.token,
                        count: count,
                        stock_id: this.stock.id
                    })
                    .then(() => {
                        this.getStock()
                        // let entries = {...this.stock.entries}
                        // entries[response.data.id] = {
                        //     id: response.data.id,
                        //     count: response.data.count,
                        //     amount: response.data.amount,
                        //     stock_id: response.data.stock_id,
                        //     created_at: response.data.created_at,
                        //     updated_at: response.data.updated_at,
                        // }
                        //
                        // this.$store.commit(STOCK_OBJECT, {
                        //     ...this.stock, entries: entries
                        // })
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
