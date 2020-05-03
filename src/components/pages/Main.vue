<template>

    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12"
                   sm="8"
                   md="4">
            </v-col>
            <stocks-carousel v-if="stocks.length > 0" :slides="stocks"></stocks-carousel>
        </v-row>
        <add-stock></add-stock>
    </v-container>
</template>

<script>
    import AddStock from "../AddStock";
    import StocksCarousel from "../StocksCarousel";

    export default {
        name: "Main",
        components: {StocksCarousel, AddStock},
        data: () => ({
            addStock: false
        }),
        computed: {
            stocks() {
                return this.$store.getters.getStocks
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
