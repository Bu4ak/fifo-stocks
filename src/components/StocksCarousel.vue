<template>
    <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            light
            interval="9000"
    >
        <v-carousel-item
                v-for="(item, i) in slides" :key="item.name" >
            <v-sheet  height="100%" >
                <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                >

                    <div class="display-3 text-center">
<!--                        <stock-card :name=item.name :price=item.ticker></stock-card>-->
                        <p>{{item.name}}</p>
                        {{item.ticker}}
                        <v-row class="fill-height"
                               align="center"
                               justify="center">

                        <v-btn >Click {{i}}</v-btn>
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
        ]
    }
</script>

<style scoped>

</style>
