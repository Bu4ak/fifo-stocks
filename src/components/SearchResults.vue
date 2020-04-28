<template>
    <v-card class="mx-auto" tile>
        <v-list>
            <v-progress-circular v-if="showLoader" indeterminate color="#8bc34a"></v-progress-circular>
            <v-subheader v-else>Search results</v-subheader>
            <v-list-item-group color="#8bc34a">
                <v-list-item v-for="(item) in results" :key="item.symbol">
                    <v-list-item-content>
                        <v-list-item-title v-text="getTicker(item.trading_grounds)"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "SearchResults",
        props: {
            keyword: String,
            showLoader: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            results: [],
            // notFound: 'Not found :('
        }),
        watch: {
            keyword: function (keyword) {
                if (keyword.length < 3) {
                    return;
                }
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.showLoader = true
                this.timer = setTimeout(() => {
                    this.search(keyword)
                }, 500);
                this.results = []
            }
        },
        methods: {
            search(keyword) {
                fetch(`https://cors-anywhere.herokuapp.com/https://investfunds.ru/stocks/?searchString=${keyword}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        this.results = data.currentResults;
                        this.showLoader = false
                    });
            },
            getTicker(arr) {
                let result = arr.find(function (obj) {
                    return obj.id === "107"
                        || obj.id === "187"
                        || obj.id === "1"
                        || obj.id === "6"
                        || obj.id === "34"
                        || obj.id === "20"
                        || obj.id === "91"
                        || obj.id === "32"
                        || true
                })
                return result && result.ticker.toUpperCase()
            }
        },

    }
</script>

<style scoped>

</style>
