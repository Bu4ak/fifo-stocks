<template>

    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12"
                   sm="8"
                   md="4">
            </v-col>
            <stocks-carousel v-if="showCarousel" :slides="stocks"></stocks-carousel>
        </v-row>
        <add-stock></add-stock>
    </v-container>
</template>

<script>
    import AddStock from "../AddStock";
    import StocksCarousel from "../StocksCarousel";
    import {STOCK_COLLECTION} from "../../vuex/mutation-types";

    export default {
        name: "Main",
        components: {StocksCarousel, AddStock},
        data: () => ({
            addStock: false
        }),
        computed: {
            stocks() {
                return this.$store.getters.getStocks
            },
            showCarousel() {
                return Object.keys(this.stocks).length !== 0
            }
        },
        mounted() {
            this.getStocksData()
        },
        methods: {
            getStocksData() {
                this.axios
                    .post('stocks', {token: this.$store.getters.token})
                    .then(response => {
                        this.$store.commit(STOCK_COLLECTION, response.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
