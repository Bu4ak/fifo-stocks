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
                        <td><h3 class="text-no-wrap">{{ totalCount }}</h3></td>
                    </tr>
                    <tr>
                        <td><h3 class="text-no-wrap">Total amount</h3></td>
                        <td><h3>{{ totalAmount }}</h3></td>
                    </tr>
                    <tr>
                        <td><h3 class="text-no-wrap">Avg amount</h3></td>
                        <td><h3>{{ isNaN(avgAmount) ? ~~avgAmount : avgAmount }}</h3></td>
                    </tr>
                    </tbody>
                </v-simple-table>
                <v-row>
                    <v-col>
                        <v-btn min-width="150px" v-model="showBuyForm" @click="toggleBuyForm" dark outlined color="green">BUY</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn min-width="150px" v-model="showSellForm" @click="toggleSellForm" dark outlined color="red">SELL</v-btn>
                    </v-col>
                    <buy-entry-form  v-if="showBuyForm" transition="fade"></buy-entry-form>
                    <sell-entry-form @price-for-sale="updateSellPrice" @count-for-sale="updateSellCount" v-if="showSellForm" :max="totalCount / stock.lot_size"
                                     @removed="getStock"></sell-entry-form>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <!--                    <v-checkbox v-model="group" :label="'Group'"></v-checkbox>-->
                    <entry :stock="stock" :entries="stock.entries" :group="group" :sellCount="sellCount"></entry>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {STOCK_OBJECT} from "../../vuex/mutation-types";
    import Entry from "../stock/Entry";
    import SellEntryForm from "../stock/SellEntryForm";
    import BuyEntryForm from "../stock/BuyEntryForm";

    export default {
        name: "SignIn",
        components: {BuyEntryForm, SellEntryForm, Entry},
        data() {
            return {
                showSellForm: false,
                showBuyForm: false,
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
                return (this.totalAmount / this.totalCount).toFixed(2)
            }
        },
        mounted() {
            this.getStock()
        },
        methods: {
            toggleBuyForm() {
                this.showBuyForm = !this.showBuyForm
                this.showSellForm = false
            },
            toggleSellForm() {
                this.showSellForm = !this.showSellForm
                this.showBuyForm = false
            },
            updateSellCount(val) {
                console.log(val)
            },
            updateSellPrice(val) {
                console.log(val)
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
        }
    }
</script>

<style scoped>

</style>
