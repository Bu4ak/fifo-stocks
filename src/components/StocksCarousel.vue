<template>
    <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            light
            interval="9000"
    >
        <v-carousel-item v-for="item in slides" :key="item.id">
            <v-sheet height="100%">
                <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                >

                    <div class="display-3 text-center">
                        <!--                        <stock-card :name=item.name :price=item.ticker></stock-card>-->
                        <h3>{{item.name}}</h3>
                        <h5>{{item.ticker}}</h5>
                        <v-row class="fill-height"
                               align="center"
                               justify="center">
                            <v-btn class="mx-2" fab dark large color="#ffdd2d" @click="show(item.id)">
                                <v-icon dark>fa-eye</v-icon>
                            </v-btn>
                        </v-row>
                    </div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
    export default {
        name: "StocksCarousel",
        props: [
            'slides'
        ],
        methods: {
            show(id) {
                this.$router.push({name: 'stock_show', params: {id: id}});
            }
        }
    }
</script>

<style scoped>

</style>
