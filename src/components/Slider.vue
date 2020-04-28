<template>
    <hooper :infiniteScroll="true" :autoPlay="true" :playSpeed="5000" :settings="hooperSettings" >
        <slide v-for="(item) in slides" :key="item.name">
            <stock-card :name=item.name :price=item.ticker></stock-card>
        </slide>
    </hooper>
</template>

<script>
    import { Hooper, Slide } from 'hooper';
    import 'hooper/dist/hooper.css';
    import StockCard from "./StockCard";

    export default {
        name: 'StockSlider',
        components: {
            StockCard,
            Hooper,
            Slide
        },
        props: [
            'slides',
        ],
        data() {
            return {
                hooperSettings: {
                    breakpoints: {
                        350: {
                            itemsToShow: 1,
                            pagination: 'fraction'
                        },
                        700: {
                            itemsToShow: 2,
                            pagination: 'fraction'
                        },
                        1150: {
                            itemsToShow: 3,
                        },
                        1500: {
                            itemsToShow: 4,
                        },
                        1850: {
                            itemsToShow: 5,
                        },
                    }
                }
            };
        }
    };
</script>
