<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <group :items="stocks"></group>
        </v-row>
        <add-stock></add-stock>
    </v-container>
</template>

<script>
    import {STOCK_COLLECTION} from "../../vuex/mutation-types";
    import Group from "../stock/Group";
    import AddStock from "../AddStock";

    export default {
        name: "Main",
        components: {Group, AddStock},
        data: () => ({
            addStock: false
        }),
        computed: {
            stocks() {
                return this.$store.getters.getStocks
            },
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
